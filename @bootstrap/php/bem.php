<?
class Bem {
  private static $__instance;
  public static function getInstance() {
    if (null === static::$__instance) {
      static::$__instance = new static();
    }

    return static::$__instance;
  }

  private $__stack;
  private $__block;
  public $block;
  public $blockName;
  protected function __construct() {
    $this->__stack = array();
  }
  private function __clone() {}
  private function __wakeup() {}

  public function begin($block) {
    array_push($this->__stack, $this->__block);
    $this->__block = $block;
    $this->initBlock();
  }
  public function end() {
    $this->__block = array_pop($this->__stack);
    $this->initBlock();
  }
  public function initBlock() {
    $this->block = $this->__block;
  }

  public function elem($elem) {
    $result = $this->block . '__' . $elem;
    $argsNum = func_num_args();
    if ($argsNum > 1) {
      for ($i = 1; $i < $argsNum; ++$i) {
        $mod = func_get_arg($i);
        $result .= ' ' . $this->block . '__' . $elem . '--' . $mod;
      }
    }
    return $result;
  }
}

global $bem;
$bem = Bem::getInstance();
