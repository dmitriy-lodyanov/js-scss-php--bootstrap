<?
function view($path, $viewScope = array()) {
  global $scope;
  $scope = $viewScope;
  return include($path);
}