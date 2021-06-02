<?php return array (
  'app' => 
  array (
    'name' => 'Laravel',
    'env' => 'local',
    'debug' => true,
    'url' => 'http://localhost:8000',
    'asset_url' => NULL,
    'timezone' => 'UTC',
    'locale' => 'en',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_US',
    'key' => 'base64:VCFuahriwa9Js5oQL7HIhqG0TPjs81dx99lMR/Rz43s=',
    'cipher' => 'AES-256-CBC',
    'providers' => 
    array (
      0 => 'Illuminate\\Auth\\AuthServiceProvider',
      1 => 'Illuminate\\Broadcasting\\BroadcastServiceProvider',
      2 => 'Illuminate\\Bus\\BusServiceProvider',
      3 => 'Illuminate\\Cache\\CacheServiceProvider',
      4 => 'Illuminate\\Foundation\\Providers\\ConsoleSupportServiceProvider',
      5 => 'Illuminate\\Cookie\\CookieServiceProvider',
      6 => 'Illuminate\\Database\\DatabaseServiceProvider',
      7 => 'Illuminate\\Encryption\\EncryptionServiceProvider',
      8 => 'Illuminate\\Filesystem\\FilesystemServiceProvider',
      9 => 'Illuminate\\Foundation\\Providers\\FoundationServiceProvider',
      10 => 'Illuminate\\Hashing\\HashServiceProvider',
      11 => 'Illuminate\\Mail\\MailServiceProvider',
      12 => 'Illuminate\\Notifications\\NotificationServiceProvider',
      13 => 'Illuminate\\Pagination\\PaginationServiceProvider',
      14 => 'Illuminate\\Pipeline\\PipelineServiceProvider',
      15 => 'Illuminate\\Queue\\QueueServiceProvider',
      16 => 'Illuminate\\Redis\\RedisServiceProvider',
      17 => 'Illuminate\\Auth\\Passwords\\PasswordResetServiceProvider',
      18 => 'Illuminate\\Session\\SessionServiceProvider',
      19 => 'Illuminate\\Translation\\TranslationServiceProvider',
      20 => 'Illuminate\\Validation\\ValidationServiceProvider',
      21 => 'Illuminate\\View\\ViewServiceProvider',
      22 => 'Spatie\\QueryBuilder\\QueryBuilderServiceProvider',
      23 => 'Laravel\\Spark\\Providers\\SparkServiceProvider',
      24 => 'App\\Providers\\SparkServiceProvider',
      25 => 'Laravel\\Cashier\\CashierServiceProvider',
      26 => 'Laravel\\Passport\\PassportServiceProvider',
      27 => 'App\\Providers\\AppServiceProvider',
      28 => 'App\\Providers\\AuthServiceProvider',
      29 => 'App\\Providers\\EventServiceProvider',
      30 => 'App\\Providers\\RouteServiceProvider',
      31 => 'Nasyrov\\Laravel\\Enums\\EnumServiceProvider',
      32 => 'Swap\\Laravel\\SwapServiceProvider',
      33 => 'Barryvdh\\Cors\\ServiceProvider',
      34 => 'ZanySoft\\Zip\\ZipServiceProvider',
    ),
    'aliases' => 
    array (
      'App' => 'Illuminate\\Support\\Facades\\App',
      'Arr' => 'Illuminate\\Support\\Arr',
      'Artisan' => 'Illuminate\\Support\\Facades\\Artisan',
      'Auth' => 'Illuminate\\Support\\Facades\\Auth',
      'Blade' => 'Illuminate\\Support\\Facades\\Blade',
      'Broadcast' => 'Illuminate\\Support\\Facades\\Broadcast',
      'Bus' => 'Illuminate\\Support\\Facades\\Bus',
      'Cache' => 'Illuminate\\Support\\Facades\\Cache',
      'Config' => 'Illuminate\\Support\\Facades\\Config',
      'Cookie' => 'Illuminate\\Support\\Facades\\Cookie',
      'Crypt' => 'Illuminate\\Support\\Facades\\Crypt',
      'DB' => 'Illuminate\\Support\\Facades\\DB',
      'Eloquent' => 'Illuminate\\Database\\Eloquent\\Model',
      'Event' => 'Illuminate\\Support\\Facades\\Event',
      'File' => 'Illuminate\\Support\\Facades\\File',
      'Gate' => 'Illuminate\\Support\\Facades\\Gate',
      'Hash' => 'Illuminate\\Support\\Facades\\Hash',
      'Lang' => 'Illuminate\\Support\\Facades\\Lang',
      'Log' => 'Illuminate\\Support\\Facades\\Log',
      'Mail' => 'Illuminate\\Support\\Facades\\Mail',
      'Notification' => 'Illuminate\\Support\\Facades\\Notification',
      'Password' => 'Illuminate\\Support\\Facades\\Password',
      'Queue' => 'Illuminate\\Support\\Facades\\Queue',
      'Redirect' => 'Illuminate\\Support\\Facades\\Redirect',
      'Redis' => 'Illuminate\\Support\\Facades\\Redis',
      'Request' => 'Illuminate\\Support\\Facades\\Request',
      'Response' => 'Illuminate\\Support\\Facades\\Response',
      'Route' => 'Illuminate\\Support\\Facades\\Route',
      'Schema' => 'Illuminate\\Support\\Facades\\Schema',
      'Session' => 'Illuminate\\Support\\Facades\\Session',
      'Storage' => 'Illuminate\\Support\\Facades\\Storage',
      'Str' => 'Illuminate\\Support\\Str',
      'URL' => 'Illuminate\\Support\\Facades\\URL',
      'Validator' => 'Illuminate\\Support\\Facades\\Validator',
      'View' => 'Illuminate\\Support\\Facades\\View',
      'Debugbar' => 'Barryvdh\\Debugbar\\Facade',
      'Swap' => 'Swap\\Laravel\\Facades\\Swap',
      'QueryBuilder' => 'Spatie\\QueryBuilder\\QueryBuilderFacade',
      'Zip' => 'ZanySoft\\Zip\\ZipFacade',
    ),
  ),
  'auth' => 
  array (
    'defaults' => 
    array (
      'guard' => 'web',
      'passwords' => 'users',
    ),
    'guards' => 
    array (
      'web' => 
      array (
        'driver' => 'session',
        'provider' => 'users',
      ),
      'api' => 
      array (
        'driver' => 'passport',
        'provider' => 'users',
      ),
    ),
    'providers' => 
    array (
      'users' => 
      array (
        'driver' => 'eloquent',
        'model' => 'App\\User',
      ),
    ),
    'passwords' => 
    array (
      'users' => 
      array (
        'provider' => 'users',
        'email' => 'spark::auth.emails.password',
        'table' => 'password_resets',
        'expire' => 60,
      ),
    ),
  ),
  'broadcasting' => 
  array (
    'default' => 'log',
    'connections' => 
    array (
      'pusher' => 
      array (
        'driver' => 'pusher',
        'key' => '',
        'secret' => '',
        'app_id' => '',
        'options' => 
        array (
          'cluster' => 'mt1',
          'encrypted' => true,
        ),
      ),
      'redis' => 
      array (
        'driver' => 'redis',
        'connection' => 'default',
      ),
      'log' => 
      array (
        'driver' => 'log',
      ),
      'null' => 
      array (
        'driver' => 'null',
      ),
    ),
  ),
  'cache' => 
  array (
    'default' => 'file',
    'stores' => 
    array (
      'apc' => 
      array (
        'driver' => 'apc',
      ),
      'array' => 
      array (
        'driver' => 'array',
      ),
      'database' => 
      array (
        'driver' => 'database',
        'table' => 'cache',
        'connection' => NULL,
      ),
      'file' => 
      array (
        'driver' => 'file',
        'path' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\storage\\framework/cache/data',
      ),
      'memcached' => 
      array (
        'driver' => 'memcached',
        'persistent_id' => NULL,
        'sasl' => 
        array (
          0 => NULL,
          1 => NULL,
        ),
        'options' => 
        array (
        ),
        'servers' => 
        array (
          0 => 
          array (
            'host' => '127.0.0.1',
            'port' => 11211,
            'weight' => 100,
          ),
        ),
      ),
      'redis' => 
      array (
        'driver' => 'redis',
        'connection' => 'cache',
      ),
      'dynamodb' => 
      array (
        'driver' => 'dynamodb',
        'key' => '',
        'secret' => '',
        'region' => 'us-east-1',
        'table' => 'cache',
      ),
    ),
    'prefix' => 'laravel_cache',
  ),
  'cookie-consent' => 
  array (
    'enabled' => true,
    'cookie_name' => 'laravel_cookie_consent',
    'cookie_lifetime' => 7300,
  ),
  'cors' => 
  array (
    'supportsCredentials' => false,
    'allowedOrigins' => 
    array (
      0 => '*',
    ),
    'allowedOriginsPatterns' => 
    array (
    ),
    'allowedHeaders' => 
    array (
      0 => '*',
    ),
    'allowedMethods' => 
    array (
      0 => '*',
    ),
    'exposedHeaders' => 
    array (
    ),
    'maxAge' => 0,
  ),
  'countries' => 
  array (
    'ARG' => 
    array (
      'document_code' => 'CAI o CAE',
      'document_mask' => '1111-11111111',
      'taxid_name' => 'CUIT o DNI',
      'default_currency' => 'ARS',
    ),
    'BRA' => 
    array (
      'document_code' => '',
      'document_mask' => '',
      'taxid_name' => 'CPF o CNPJ',
      'default_currency' => 'BRL',
    ),
    'PRY' => 
    array (
      'document_code' => 'Timbrado',
      'document_mask' => '###-###-#######',
      'taxid_name' => 'RUC o CI',
      'default_currency' => 'PYG',
    ),
  ),
  'database' => 
  array (
    'default' => 'mysql',
    'connections' => 
    array (
      'sqlite' => 
      array (
        'driver' => 'sqlite',
        'database' => 'debehaber',
        'prefix' => '',
        'foreign_key_constraints' => true,
      ),
      'mysql' => 
      array (
        'driver' => 'mysql',
        'host' => 'localhost',
        'port' => '3306',
        'database' => 'debehaber',
        'username' => 'root',
        'password' => 'root',
        'unix_socket' => '',
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix' => '',
        'prefix_indexes' => true,
        'strict' => true,
        'engine' => NULL,
        'options' => 
        array (
        ),
      ),
      'pgsql' => 
      array (
        'driver' => 'pgsql',
        'host' => 'localhost',
        'port' => '3306',
        'database' => 'debehaber',
        'username' => 'root',
        'password' => 'root',
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
        'schema' => 'public',
        'sslmode' => 'prefer',
      ),
      'sqlsrv' => 
      array (
        'driver' => 'sqlsrv',
        'host' => 'localhost',
        'port' => '3306',
        'database' => 'debehaber',
        'username' => 'root',
        'password' => 'root',
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
      ),
    ),
    'migrations' => 'migrations',
    'redis' => 
    array (
      'client' => 'predis',
      'options' => 
      array (
        'cluster' => 'predis',
      ),
      'default' => 
      array (
        'host' => '127.0.0.1',
        'password' => '',
        'port' => '6379',
        'database' => 0,
      ),
      'cache' => 
      array (
        'host' => '127.0.0.1',
        'password' => '',
        'port' => '6379',
        'database' => 1,
      ),
    ),
  ),
  'debugbar' => 
  array (
    'enabled' => NULL,
    'except' => 
    array (
      0 => 'telescope*',
    ),
    'storage' => 
    array (
      'enabled' => true,
      'driver' => 'file',
      'path' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\storage\\debugbar',
      'connection' => NULL,
      'provider' => '',
    ),
    'include_vendors' => true,
    'capture_ajax' => true,
    'add_ajax_timing' => false,
    'error_handler' => false,
    'clockwork' => false,
    'collectors' => 
    array (
      'phpinfo' => true,
      'messages' => true,
      'time' => true,
      'memory' => true,
      'exceptions' => true,
      'log' => true,
      'db' => true,
      'views' => true,
      'route' => true,
      'auth' => true,
      'gate' => true,
      'session' => true,
      'symfony_request' => true,
      'mail' => true,
      'laravel' => false,
      'events' => false,
      'default_request' => false,
      'logs' => false,
      'files' => false,
      'config' => false,
      'cache' => false,
    ),
    'options' => 
    array (
      'auth' => 
      array (
        'show_name' => true,
      ),
      'db' => 
      array (
        'with_params' => true,
        'backtrace' => true,
        'timeline' => false,
        'explain' => 
        array (
          'enabled' => false,
          'types' => 
          array (
            0 => 'SELECT',
          ),
        ),
        'hints' => true,
      ),
      'mail' => 
      array (
        'full_log' => false,
      ),
      'views' => 
      array (
        'data' => false,
      ),
      'route' => 
      array (
        'label' => true,
      ),
      'logs' => 
      array (
        'file' => NULL,
      ),
      'cache' => 
      array (
        'values' => true,
      ),
    ),
    'inject' => true,
    'route_prefix' => '_debugbar',
    'route_domain' => NULL,
    'theme' => 'auto',
  ),
  'filesystems' => 
  array (
    'default' => 'local',
    'cloud' => 's3',
    'disks' => 
    array (
      'local' => 
      array (
        'driver' => 'local',
        'root' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\storage\\app',
      ),
      'public' => 
      array (
        'driver' => 'local',
        'root' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\storage\\app/public',
        'url' => 'http://localhost:8000/storage',
        'visibility' => 'public',
      ),
      's3' => 
      array (
        'driver' => 's3',
        'key' => '',
        'secret' => '',
        'region' => 'us-east-1',
        'bucket' => '',
        'url' => NULL,
      ),
      'public_uploads' => 
      array (
        'driver' => 'local',
        'root' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\public/aranduka',
      ),
    ),
  ),
  'hashing' => 
  array (
    'driver' => 'bcrypt',
    'bcrypt' => 
    array (
      'rounds' => 10,
    ),
    'argon' => 
    array (
      'memory' => 1024,
      'threads' => 2,
      'time' => 2,
    ),
  ),
  'larecipe' => 
  array (
    'docs' => 
    array (
      'route' => '/docs',
      'path' => '/resources/docs',
      'landing' => 'overview',
    ),
    'versions' => 
    array (
      'default' => 'en',
      'published' => 
      array (
        0 => 'en',
        1 => 'es',
      ),
    ),
    'settings' => 
    array (
      'auth' => false,
      'ga_id' => '',
    ),
    'cache' => 
    array (
      'enabled' => false,
      'period' => 5,
    ),
    'search' => 
    array (
      'enabled' => false,
      'default' => 'algolia',
      'engines' => 
      array (
        'internal' => 
        array (
          'index' => 
          array (
            0 => 'h2',
            1 => 'h3',
          ),
        ),
        'algolia' => 
        array (
          'key' => '',
          'index' => '',
        ),
      ),
    ),
    'ui' => 
    array (
      'code_theme' => 'dark',
      'fav' => '',
      'colors' => 
      array (
        'primary' => '#787AF6',
        'secondary' => '#2b9cf2',
      ),
    ),
    'seo' => 
    array (
      'author' => 'DebeHaber - Accounting Software',
      'description' => 'Documentation for DebeHaber. Simplify your account process by automating transactions, journal entries, and more. Use this documentation to help you get the most out of our accounting tools',
      'keywords' => 'Accounting, Accountants, Accounting Software, Core Accounting, Contabilidad, Software de Contabilidad, Contadores',
      'og' => 
      array (
        'title' => '',
        'type' => 'article',
        'url' => '',
        'image' => '',
        'description' => '',
      ),
    ),
    'forum' => 
    array (
      'enabled' => false,
      'default' => 'disqus',
      'services' => 
      array (
        'disqus' => 
        array (
          'site_name' => '',
        ),
      ),
    ),
    'packages' => 
    array (
      'path' => 'larecipe-components',
    ),
    'blade-parser' => 
    array (
      'regex' => 
      array (
        'code-blocks' => 
        array (
          'match' => '/\\<pre\\>(.|\\n)*?<\\/pre\\>/',
          'replacement' => '<code-block>',
        ),
      ),
    ),
  ),
  'logging' => 
  array (
    'default' => 'stack',
    'channels' => 
    array (
      'stack' => 
      array (
        'driver' => 'stack',
        'channels' => 
        array (
          0 => 'daily',
        ),
        'ignore_exceptions' => false,
      ),
      'single' => 
      array (
        'driver' => 'single',
        'path' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\storage\\logs/laravel.log',
        'level' => 'debug',
      ),
      'daily' => 
      array (
        'driver' => 'daily',
        'path' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\storage\\logs/laravel.log',
        'level' => 'debug',
        'days' => 14,
      ),
      'slack' => 
      array (
        'driver' => 'slack',
        'url' => NULL,
        'username' => 'Laravel Log',
        'emoji' => ':boom:',
        'level' => 'critical',
      ),
      'papertrail' => 
      array (
        'driver' => 'monolog',
        'level' => 'debug',
        'handler' => 'Monolog\\Handler\\SyslogUdpHandler',
        'handler_with' => 
        array (
          'host' => NULL,
          'port' => NULL,
        ),
      ),
      'stderr' => 
      array (
        'driver' => 'monolog',
        'handler' => 'Monolog\\Handler\\StreamHandler',
        'formatter' => NULL,
        'with' => 
        array (
          'stream' => 'php://stderr',
        ),
      ),
      'syslog' => 
      array (
        'driver' => 'syslog',
        'level' => 'debug',
      ),
      'errorlog' => 
      array (
        'driver' => 'errorlog',
        'level' => 'debug',
      ),
    ),
  ),
  'mail' => 
  array (
    'driver' => 'smtp',
    'host' => 'smtp.mailtrap.io',
    'port' => '2525',
    'from' => 
    array (
      'address' => NULL,
      'name' => '',
    ),
    'encryption' => NULL,
    'username' => NULL,
    'password' => NULL,
    'sendmail' => '/usr/sbin/sendmail -bs',
    'markdown' => 
    array (
      'theme' => 'default',
      'paths' => 
      array (
        0 => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\resources\\views/vendor/mail',
      ),
    ),
    'log_channel' => NULL,
  ),
  'query-builder' => 
  array (
    'parameters' => 
    array (
      'include' => 'include',
      'filter' => 'filter',
      'sort' => 'sort',
      'fields' => 'fields',
      'append' => 'append',
    ),
  ),
  'queue' => 
  array (
    'default' => 'sync',
    'connections' => 
    array (
      'sync' => 
      array (
        'driver' => 'sync',
      ),
      'database' => 
      array (
        'driver' => 'database',
        'table' => 'jobs',
        'queue' => 'default',
        'retry_after' => 90,
      ),
      'beanstalkd' => 
      array (
        'driver' => 'beanstalkd',
        'host' => 'localhost',
        'queue' => 'default',
        'retry_after' => 90,
        'block_for' => 0,
      ),
      'sqs' => 
      array (
        'driver' => 'sqs',
        'key' => '',
        'secret' => '',
        'prefix' => 'https://sqs.us-east-1.amazonaws.com/your-account-id',
        'queue' => 'your-queue-name',
        'region' => 'us-east-1',
      ),
      'redis' => 
      array (
        'driver' => 'redis',
        'connection' => 'default',
        'queue' => 'default',
        'retry_after' => 90,
        'block_for' => NULL,
      ),
    ),
    'failed' => 
    array (
      'database' => 'mysql',
      'table' => 'failed_jobs',
    ),
  ),
  'secure-headers' => 
  array (
    'server' => '',
    'x-content-type-options' => 'nosniff',
    'x-download-options' => 'noopen',
    'x-frame-options' => 'sameorigin',
    'x-permitted-cross-domain-policies' => 'none',
    'x-power-by' => '',
    'x-xss-protection' => '1; mode=block',
    'referrer-policy' => 'no-referrer',
    'clear-site-data' => 
    array (
      'enable' => false,
      'all' => false,
      'cache' => true,
      'cookies' => true,
      'storage' => true,
      'executionContexts' => true,
    ),
    'hsts' => 
    array (
      'enable' => true,
      'max-age' => 15552000,
      'include-sub-domains' => false,
    ),
    'expect-ct' => 
    array (
      'enable' => false,
      'max-age' => 2147483648,
      'enforce' => false,
      'report-uri' => NULL,
    ),
    'hpkp' => 
    array (
      'hashes' => 
      array (
      ),
      'include-sub-domains' => false,
      'max-age' => 15552000,
      'report-only' => false,
      'report-uri' => NULL,
    ),
    'feature-policy' => 
    array (
      'enable' => true,
      'autoplay' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'camera' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'encrypted-media' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'fullscreen' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'geolocation' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'microphone' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'midi' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'payment' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'picture-in-picture' => 
      array (
        'none' => false,
        '*' => true,
        'self' => false,
        'allow' => 
        array (
        ),
      ),
      'accelerometer' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'ambient-light-sensor' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'gyroscope' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'magnetometer' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'speaker' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'sync-xhr' => 
      array (
        'none' => false,
        '*' => true,
        'self' => false,
        'allow' => 
        array (
        ),
      ),
      'usb' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
      'vr' => 
      array (
        'none' => false,
        '*' => false,
        'self' => true,
        'allow' => 
        array (
        ),
      ),
    ),
    'custom-csp' => NULL,
    'csp' => 
    array (
      'report-only' => false,
      'report-uri' => NULL,
      'block-all-mixed-content' => false,
      'upgrade-insecure-requests' => false,
      'script-src' => 
      array (
        'allow' => 
        array (
        ),
        'hashes' => 
        array (
        ),
        'nonces' => 
        array (
        ),
        'schemes' => 
        array (
        ),
        'self' => true,
        'unsafe-inline' => false,
        'unsafe-eval' => false,
        'strict-dynamic' => false,
        'unsafe-hashed-attributes' => false,
        'report-sample' => false,
        'add-generated-nonce' => false,
      ),
      'style-src' => 
      array (
        'allow' => 
        array (
        ),
        'hashes' => 
        array (
        ),
        'nonces' => 
        array (
        ),
        'schemes' => 
        array (
        ),
        'self' => true,
        'unsafe-inline' => true,
        'report-sample' => true,
        'add-generated-nonce' => false,
      ),
      'img-src' => 
      array (
        'self' => true,
      ),
      'default-src' => 
      array (
      ),
      'base-uri' => 
      array (
      ),
      'connect-src' => 
      array (
      ),
      'font-src' => 
      array (
      ),
      'form-action' => 
      array (
      ),
      'frame-ancestors' => 
      array (
      ),
      'frame-src' => 
      array (
      ),
      'manifest-src' => 
      array (
      ),
      'media-src' => 
      array (
      ),
      'object-src' => 
      array (
      ),
      'worker-src' => 
      array (
      ),
      'plugin-types' => 
      array (
      ),
      'require-sri-for' => '',
      'sandbox' => '',
    ),
  ),
  'services' => 
  array (
    'authy' => 
    array (
      'secret' => NULL,
    ),
    'mailgun' => 
    array (
      'domain' => NULL,
      'secret' => NULL,
    ),
    'ses' => 
    array (
      'key' => NULL,
      'secret' => NULL,
      'region' => 'us-east-1',
    ),
    'stripe' => 
    array (
      'model' => 'App\\User',
      'key' => NULL,
      'secret' => NULL,
    ),
  ),
  'session' => 
  array (
    'driver' => 'file',
    'lifetime' => '120',
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\storage\\framework/sessions',
    'connection' => NULL,
    'table' => 'sessions',
    'store' => NULL,
    'lottery' => 
    array (
      0 => 2,
      1 => 100,
    ),
    'cookie' => 'laravel_session',
    'path' => '/',
    'domain' => NULL,
    'secure' => false,
    'http_only' => true,
    'same_site' => NULL,
  ),
  'swap' => 
  array (
    'options' => 
    array (
    ),
    'services' => 
    array (
      'fixer' => 
      array (
        'access_key' => '9436601a4c275f81c1f7784bcd4cbec7',
        'enterprise' => true,
      ),
      'currency_layer' => 
      array (
        'access_key' => 'secret',
        'enterprise' => false,
      ),
      'forge' => 
      array (
        'api_key' => 'secret',
      ),
    ),
    'cache' => NULL,
    'http_client' => NULL,
    'request_factory' => NULL,
  ),
  'telescope' => 
  array (
    'domain' => NULL,
    'path' => 'telescope',
    'driver' => 'database',
    'storage' => 
    array (
      'database' => 
      array (
        'connection' => 'mysql',
      ),
    ),
    'enabled' => true,
    'middleware' => 
    array (
      0 => 'web',
      1 => 'Laravel\\Telescope\\Http\\Middleware\\Authorize',
    ),
    'ignore_paths' => 
    array (
    ),
    'ignore_commands' => 
    array (
    ),
    'watchers' => 
    array (
      'Laravel\\Telescope\\Watchers\\CacheWatcher' => true,
      'Laravel\\Telescope\\Watchers\\CommandWatcher' => 
      array (
        'enabled' => true,
        'ignore' => 
        array (
        ),
      ),
      'Laravel\\Telescope\\Watchers\\DumpWatcher' => true,
      'Laravel\\Telescope\\Watchers\\EventWatcher' => true,
      'Laravel\\Telescope\\Watchers\\ExceptionWatcher' => true,
      'Laravel\\Telescope\\Watchers\\JobWatcher' => true,
      'Laravel\\Telescope\\Watchers\\LogWatcher' => true,
      'Laravel\\Telescope\\Watchers\\MailWatcher' => true,
      'Laravel\\Telescope\\Watchers\\ModelWatcher' => 
      array (
        'enabled' => true,
        'events' => 
        array (
          0 => 'eloquent.*',
        ),
      ),
      'Laravel\\Telescope\\Watchers\\NotificationWatcher' => true,
      'Laravel\\Telescope\\Watchers\\QueryWatcher' => 
      array (
        'enabled' => true,
        'ignore_packages' => true,
        'slow' => 100,
      ),
      'Laravel\\Telescope\\Watchers\\RedisWatcher' => true,
      'Laravel\\Telescope\\Watchers\\RequestWatcher' => 
      array (
        'enabled' => true,
        'size_limit' => 64,
      ),
      'Laravel\\Telescope\\Watchers\\GateWatcher' => 
      array (
        'enabled' => true,
        'ignore_abilities' => 
        array (
        ),
        'ignore_packages' => true,
      ),
      'Laravel\\Telescope\\Watchers\\ScheduleWatcher' => true,
    ),
  ),
  'view' => 
  array (
    'paths' => 
    array (
      0 => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\resources\\views',
    ),
    'compiled' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\storage\\framework\\views',
  ),
  'debug-server' => 
  array (
    'host' => 'tcp://127.0.0.1:9912',
  ),
  'image' => 
  array (
    'driver' => 'gd',
  ),
  'passport' => 
  array (
    'private_key' => NULL,
    'public_key' => NULL,
  ),
  'excel' => 
  array (
    'exports' => 
    array (
      'chunk_size' => 1000,
      'pre_calculate_formulas' => false,
      'strict_null_comparison' => false,
      'csv' => 
      array (
        'delimiter' => ',',
        'enclosure' => '"',
        'line_ending' => '
',
        'use_bom' => false,
        'include_separator_line' => false,
        'excel_compatibility' => false,
      ),
      'properties' => 
      array (
        'creator' => '',
        'lastModifiedBy' => '',
        'title' => '',
        'description' => '',
        'subject' => '',
        'keywords' => '',
        'category' => '',
        'manager' => '',
        'company' => '',
      ),
    ),
    'imports' => 
    array (
      'read_only' => true,
      'ignore_empty' => false,
      'heading_row' => 
      array (
        'formatter' => 'slug',
      ),
      'csv' => 
      array (
        'delimiter' => ',',
        'enclosure' => '"',
        'escape_character' => '\\',
        'contiguous' => false,
        'input_encoding' => 'UTF-8',
      ),
      'properties' => 
      array (
        'creator' => '',
        'lastModifiedBy' => '',
        'title' => '',
        'description' => '',
        'subject' => '',
        'keywords' => '',
        'category' => '',
        'manager' => '',
        'company' => '',
      ),
    ),
    'extension_detector' => 
    array (
      'xlsx' => 'Xlsx',
      'xlsm' => 'Xlsx',
      'xltx' => 'Xlsx',
      'xltm' => 'Xlsx',
      'xls' => 'Xls',
      'xlt' => 'Xls',
      'ods' => 'Ods',
      'ots' => 'Ods',
      'slk' => 'Slk',
      'xml' => 'Xml',
      'gnumeric' => 'Gnumeric',
      'htm' => 'Html',
      'html' => 'Html',
      'csv' => 'Csv',
      'tsv' => 'Csv',
      'pdf' => 'Dompdf',
    ),
    'value_binder' => 
    array (
      'default' => 'Maatwebsite\\Excel\\DefaultValueBinder',
    ),
    'cache' => 
    array (
      'driver' => 'memory',
      'batch' => 
      array (
        'memory_limit' => 60000,
      ),
      'illuminate' => 
      array (
        'store' => NULL,
      ),
    ),
    'transactions' => 
    array (
      'handler' => 'db',
    ),
    'temporary_files' => 
    array (
      'local_path' => 'C:\\Users\\PANKEEL\\Documents\\GitHub\\DebeHaber\\storage\\framework/laravel-excel',
      'remote_disk' => NULL,
      'remote_prefix' => NULL,
      'force_resync_remote' => NULL,
    ),
  ),
  'trustedproxy' => 
  array (
    'proxies' => NULL,
    'headers' => 30,
  ),
  'tinker' => 
  array (
    'commands' => 
    array (
    ),
    'dont_alias' => 
    array (
      0 => 'App\\Nova',
    ),
  ),
);
