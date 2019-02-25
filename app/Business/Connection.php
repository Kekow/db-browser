<?php

namespace App\Business;

use App\Business\Builders\ConnectionDataBuilder;
use App\Business\ClientSession;
use App\Connection as ConnectionModel;
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

// TODO: Rename!
class Connection
{
    public static function getInstance(Request $request)
    {
        if (ClientSession::isConnected($request))
            return ClientSession::getConnection($request);

        return redirect(route('views.home'));
    }

    public static function connect(Request $request)
    {
        $connectionData = ConnectionDataBuilder::fromRequest($request);
        $connectionConfig = Connection::getConnectionConfig($connectionData);

        $capsule = new Capsule;
        $capsule->addConnection($connectionConfig, 'client-connection');
        $capsule->bootEloquent();
        $capsule->setAsGlobal();

        ClientSession::storeConnection($request, $connectionData);

        return $capsule->getConnection('client-connection');
    }

    public static function test(Request $request)
    {
        $connectionData = ConnectionDataBuilder::fromRequest($request);
        $connectionConfig = Connection::getConnectionConfig($connectionData);

        $capsule = new Capsule;
        $capsule->addConnection($connectionConfig, 'client-connection-test');
        
        $capsule->getConnection('client-connection-test')->getPdo();
    }    

    public static function disconnect(Request $request)
    {
        ClientSession::forgetConnection($request);

        DB::purge('custom-connection');
    }

    public static function storeConnection(Request $request)
    {
        $connectionName = $request->input('name');
        $connectionData = $request->input('data');

        $connection = new ConnectionModel;
        $connection->Name = $connectionName;
        $connection->Driver = $connectionData['driver'];
        $connection->Host = $connectionData['host'];
        $connection->Port = $connectionData['port'];
        $connection->Username = $connectionData['username'];
        $connection->Password = $connectionData['password'];
        $connection->Database = $connectionData['database'];
        $connection->save();
    }

    public static function validateStoreConnection(Request $request)
    {
        $connectionName = $request->input('name');
        
        return ConnectionModel::where('Name', '=', $connectionName)->count() < 1;
    }

    public static function getConnectionInfo(Request $request)
    {
        // TODO: Replicated!
        
        $session = $request->session();

        $connectionConfig = [
            'driver'    => SessionValues::get($session, 'driver'),
            'host'      => SessionValues::get($session, 'hostname'),
            'port'      => SessionValues::get($session, 'port'),
            'database'  => SessionValues::get($session, 'database'),
            'username'  => SessionValues::get($session, 'username'),
            'password'  => SessionValues::get($session, 'password')
        ];

        return $connectionConfig;        
    }

    private static function getConnectionConfig($connectionData)
    {
        return [
            'driver'    => $connectionData->getDriver(),
            'host'      => $connectionData->getHost(),
            'port'      => $connectionData->getPort(),
            'database'  => $connectionData->getDatabase(),
            'username'  => $connectionData->getUsername(),
            'password'  => $connectionData->getPassword()
        ];
    }
}
