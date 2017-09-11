<?
function ob($fn)
{
  ob_start();
  $fn();
  return ob_get_clean();
}
