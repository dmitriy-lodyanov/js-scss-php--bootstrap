<?
function res($url) {
  if ($url[0] === '/') {
    $url = substr($url, 1);
  }
  $realfile = realpath($url);
  $timestamp = filemtime($realfile);
  return '/' . $url . '?v=' . $timestamp;
}