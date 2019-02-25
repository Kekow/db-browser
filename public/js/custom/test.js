function fillConnectionData() {
    $('select[name=driver]').val('pgsql');
    $('input[name=database]').val('liberdb');
    $('input[name=hostname]').val('liberdb');
    $('input[name=port]').val('5432');
    $('input[name=username]').val('postgres');
    $('input[name=password]').val('tbx-liberdb');
}
