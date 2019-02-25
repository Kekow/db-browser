<?php

namespace App\Http\Controllers;

use App\Business\Connection;
use App\Business\Builders\ConnectionDataBuilder;
use App\Business\Builders\ResultMessageBuilder;
use Illuminate\Http\Request;

class ConnectionController extends Controller
{
    // TODO: Fix text location.
    private $successConnMsg = "connection successful";

    public function connect(Request $request)
    {
        try {
            Connection::test($request);
            Connection::connect($request);

            return ResultMessageBuilder::buildSuccessMessage($this->successConnMsg);
        } catch (\Exception $e) {
            return ResultMessageBuilder::buildErrorMessage( $e->getMessage() );
        }

        return $this->testConnection($request);
    }

    public function disconnect(Request $request)
    {
        Connection::disconnect($request);

        return \redirect(route('views.home'));
    }

    public function testConnection(Request $request)
    {
        try {
            Connection::test($request);

            return ResultMessageBuilder::buildSuccessMessage($this->successConnMsg);
        } catch (\Exception $e) {
            return ResultMessageBuilder::buildErrorMessage( $e->getMessage() );
        }
    }

    public function storeConnection(Request $request)
    {
        try {
            Connection::storeConnection($request);    

            return json_encode(['success' => 'false']);
        } catch (Exception $ex) {
            return json_encode(['success' => 'false']);
        }
    }

    public function validateStoreConnection(Request $request)
    {
        $validStoreConnection = Connection::validateStoreConnection($request);

        return \json_encode($validStoreConnection);
    }

    public function getConnectionInfo(Request $request) 
    {
        $connectionInfo = Connection::getConnectionInfo($request);

        return \json_encode($connectionInfo);
    }
}
