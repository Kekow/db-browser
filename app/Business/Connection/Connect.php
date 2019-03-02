<?php

namespace App\Business\Connection;

use App\Business\CapsuleConnection;
use App\Business\ConnectionConfig;

class Connect
{
    protected $connectionConfig;
    protected $connection;

    public function setConnectionConfig(ConnectionConfig $connectionConfig) { $this->connectionConfig = $connectionConfig; }
    
    public function getConnection() 
    { 
        return $this->connection; 
    }

    public function execute()
    {
        $capsuleConnection = new CapsuleConnection();
        $capsuleConnection->setConnectionConfig($this->connectionConfig);

        $this->connection = $capsuleConnection->getConnection();
        $this->connection->getPdo();
    }
}