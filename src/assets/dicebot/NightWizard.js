/* Generated by Opal 1.0.3 */
Opal.modules["utils/normalize"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;

  Opal.add_stubs(['$module_function', '$===', '$==', '$to_i']);
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Normalize');

    var $nesting = [self].concat($parent_nesting), $Normalize_comparison_operator$1, $Normalize_target_number$2;

    
    self.$module_function();
    
    Opal.def(self, '$comparison_operator', $Normalize_comparison_operator$1 = function $$comparison_operator(op) {
      var self = this, $case = nil;

      return (function() {$case = op;
      if (/<=|=</['$===']($case)) {return "<="}
      else if (/>=|=>/['$===']($case)) {return ">="}
      else if (/<>|!=|=!/['$===']($case)) {return "!="}
      else if (/</['$===']($case)) {return "<"}
      else if (/>/['$===']($case)) {return ">"}
      else if (/\=/['$===']($case)) {return "=="}
      else { return nil }})()
    }, $Normalize_comparison_operator$1.$$arity = 1);
    
    Opal.def(self, '$target_number', $Normalize_target_number$2 = function $$target_number(val) {
      var self = this;

      if (val['$==']("?")) {
        return val
      } else {
        return val.$to_i()
      }
    }, $Normalize_target_number$2.$$arity = 1);
  })($nesting[0], $nesting)
};

/* Generated by Opal 1.0.3 */
(function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy;

  Opal.add_stubs(['$require', '$setPrefixes', '$=~', '$gsub', '$empty?', '$last_match', '$checkRoll', '$debug', '$to_i', '$comparison_operator', '$split', '$parren_killer', '$nw_dice', '$+', '$check_nDx', '$<', '$to_s', '$getValuesFromText', '$roll', '$include?', '$getFumbleTextAndTotal', '$checkCritical', '$==', '$collect', '$getCriticalValue']);
  
  self.$require("utils/normalize");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NightWizard');

    var $nesting = [self].concat($parent_nesting), $NightWizard_initialize$1, $NightWizard_changeText$2, $NightWizard_dice_command_xRn$6, $NightWizard_checkRoll$7, $NightWizard_getValueText$8, $NightWizard_nw_dice$9, $NightWizard_getFumbleTextAndTotal$10, $NightWizard_setCriticalValues$11, $NightWizard_getValuesFromText$12, $NightWizard_checkCritical$14, $NightWizard_getCriticalValue$15;

    self.$$prototype.criticalValues = self.$$prototype.fumbleValues = nil;
    
    Opal.const_set($nesting[0], 'ID', "NightWizard");
    Opal.const_set($nesting[0], 'NAME', "ナイトウィザード The 2nd Edition");
    Opal.const_set($nesting[0], 'SORT_KEY', "ないとういさあと2");
    Opal.const_set($nesting[0], 'HELP_MESSAGE', "" + "・判定用コマンド　(nNW+m@x#y)\n" + "　\"(基本値)NW(常時および常時に準じる特技等及び状態異常（省略可）)@(クリティカル値)#(ファンブル値)（常時以外の特技等及び味方の支援効果等の影響（省略可））\"でロールします。\n" + "　Rコマンド(2R6m[n,m]c[x]f[y]>=t tは目標値)に読替されます。\n" + "　クリティカル値、ファンブル値が無い場合は1や13などのあり得ない数値を入れてください。\n" + "　例）12NW-5@7#2　　1NW　　50nw+5@7,10#2,5　50nw-5+10@7,10#2,5+15+25\n");
    self.$setPrefixes(["\\d+NW"]);
    
    Opal.def(self, '$initialize', $NightWizard_initialize$1 = function $$initialize() {
      var $iter = $NightWizard_initialize$1.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;

      if ($iter) $NightWizard_initialize$1.$$p = null;
      // Prepare super implicit arguments
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $NightWizard_initialize$1, false), $zuper, $iter);
      return (self.sendMode = 2);
    }, $NightWizard_initialize$1.$$arity = 0);
    
    Opal.def(self, '$changeText', $NightWizard_changeText$2 = function $$changeText(string) {
      var $$3, $$4, $$5, self = this;

      
      if ($truthy(string['$=~'](/NW/i))) {
      } else {
        return string
      };
      string = $send(string, 'gsub', [/([\-\d]+)NW([\+\-\d]*)@([,\d]+)#([,\d]+)([\+\-\d]*)/i], ($$3 = function(){var self = $$3.$$s || this, modify = nil;

      
        modify = (function() {if ($truthy($$($nesting, 'Regexp').$last_match(5)['$empty?']())) {
          return ""
        } else {
          return "" + "," + ($$($nesting, 'Regexp').$last_match(5))
        }; return nil; })();
        return "" + "2R6m[" + ($$($nesting, 'Regexp').$last_match(1)) + ($$($nesting, 'Regexp').$last_match(2)) + (modify) + "]c[" + ($$($nesting, 'Regexp').$last_match(3)) + "]f[" + ($$($nesting, 'Regexp').$last_match(4)) + "]";}, $$3.$$s = self, $$3.$$arity = 0, $$3));
      string = $send(string, 'gsub', [/([\-\d]+)NW([\+\-\d]*)/i], ($$4 = function(){var self = $$4.$$s || this;

      return "" + "2R6m[" + ($$($nesting, 'Regexp').$last_match(1)) + ($$($nesting, 'Regexp').$last_match(2)) + "]"}, $$4.$$s = self, $$4.$$arity = 0, $$4));
      return (string = $send(string, 'gsub', [/NW([\+\-\d]*)/i], ($$5 = function(){var self = $$5.$$s || this;

      return "" + "2R6m[0" + ($$($nesting, 'Regexp').$last_match(1)) + "]"}, $$5.$$s = self, $$5.$$arity = 0, $$5)));
    }, $NightWizard_changeText$2.$$arity = 1);
    
    Opal.def(self, '$dice_command_xRn', $NightWizard_dice_command_xRn$6 = function $$dice_command_xRn(string, nick_e) {
      var self = this;

      return self.$checkRoll(string, nick_e)
    }, $NightWizard_dice_command_xRn$6.$$arity = 2);
    
    Opal.def(self, '$checkRoll', $NightWizard_checkRoll$7 = function $$checkRoll(string, nick_e) {
      var $a, $b, self = this, output = nil, num = nil, base_and_modify = nil, criticalText = nil, criticalValue = nil, fumbleText = nil, fumbleValue = nil, judgeText = nil, judgeOperator = nil, judgeValue = nil, crit = nil, fumble = nil, cmp_op = nil, diff = nil, base = nil, modify = nil, total = nil, out_str = nil;

      
      self.$debug("checkRoll string", string);
      output = "1";
      num = "[,\\d\\+\\-]+";
      if ($truthy(new RegExp("" + "(^|\\s)S?(2R6m\\[(" + (num) + ")\\](c\\[(" + (num) + ")\\])?(f\\[(" + (num) + ")\\])?(([>=]+)(\\d+))?)(\\s|$)", 'i')['$=~'](string))) {
      } else {
        return output
      };
      self.$debug("is valid string");
      string = $$($nesting, 'Regexp').$last_match(2);
      base_and_modify = $$($nesting, 'Regexp').$last_match(3);
      criticalText = $$($nesting, 'Regexp').$last_match(4);
      criticalValue = $$($nesting, 'Regexp').$last_match(5);
      fumbleText = $$($nesting, 'Regexp').$last_match(6);
      fumbleValue = $$($nesting, 'Regexp').$last_match(7);
      judgeText = $$($nesting, 'Regexp').$last_match(8);
      judgeOperator = $$($nesting, 'Regexp').$last_match(9);
      judgeValue = $$($nesting, 'Regexp').$last_match(10).$to_i();
      crit = "0";
      fumble = "0";
      cmp_op = nil;
      diff = 0;
      if ($truthy(criticalText)) {
        crit = criticalValue};
      if ($truthy(fumbleText)) {
        fumble = fumbleValue};
      if ($truthy(judgeText)) {
        
        diff = judgeValue;
        self.$debug("judgeOperator", judgeOperator);
        cmp_op = $$($nesting, 'Normalize').$comparison_operator(judgeOperator);};
      $b = base_and_modify.$split(/,/), $a = Opal.to_ary($b), (base = ($a[0] == null ? nil : $a[0])), (modify = ($a[1] == null ? nil : $a[1])), $b;
      base = self.$parren_killer("" + "(0" + (base) + ")").$to_i();
      modify = self.$parren_killer("" + "(0" + (modify) + ")").$to_i();
      self.$debug("base_and_modify, base, modify", base_and_modify, base, modify);
      $b = self.$nw_dice(base, modify, crit, fumble), $a = Opal.to_ary($b), (total = ($a[0] == null ? nil : $a[0])), (out_str = ($a[1] == null ? nil : $a[1])), $b;
      output = "" + (nick_e) + ": (" + (string) + ") ＞ " + (out_str);
      if ($truthy(cmp_op)) {
        output = $rb_plus(output, self.$check_nDx(total, cmp_op, diff))};
      return output;
    }, $NightWizard_checkRoll$7.$$arity = 2);
    
    Opal.def(self, '$getValueText', $NightWizard_getValueText$8 = function $$getValueText(text) {
      var self = this, value = nil;

      
      value = text.$to_i();
      if ($truthy($rb_lt(value, 0))) {
        return value.$to_s()};
      return "" + "+" + (value);
    }, $NightWizard_getValueText$8.$$arity = 1);
    
    Opal.def(self, '$nw_dice', $NightWizard_nw_dice$9 = function $$nw_dice(base, modify, criticalText, fumbleText) {
      var $a, $b, self = this, total = nil, output = nil, dice_n = nil, dice_str = nil, fumble_text = nil;

      
      self.$debug("nw_dice : base, modify, criticalText, fumbleText", base, modify, criticalText, fumbleText);
      self.criticalValues = self.$getValuesFromText(criticalText, [10]);
      self.fumbleValues = self.$getValuesFromText(fumbleText, [5]);
      total = 0;
      output = "";
      self.$debug("@criticalValues", self.criticalValues);
      self.$debug("@fumbleValues", self.fumbleValues);
      $b = self.$roll(2, 6, 0), $a = Opal.to_ary($b), (dice_n = ($a[0] == null ? nil : $a[0])), (dice_str = ($a[1] == null ? nil : $a[1])), $b;
      total = 0;
      if ($truthy(self.fumbleValues['$include?'](dice_n))) {
        
        $b = self.$getFumbleTextAndTotal(base, modify, dice_str), $a = Opal.to_ary($b), (fumble_text = ($a[0] == null ? nil : $a[0])), (total = ($a[1] == null ? nil : $a[1])), $b;
        output = "" + (fumble_text) + " ＞ ファンブル ＞ " + (total);
      } else {
        
        total = $rb_plus(base, modify);
        $b = self.$checkCritical(total, dice_str, dice_n), $a = Opal.to_ary($b), (total = ($a[0] == null ? nil : $a[0])), (output = ($a[1] == null ? nil : $a[1])), $b;
      };
      return [total, output];
    }, $NightWizard_nw_dice$9.$$arity = 4);
    
    Opal.def(self, '$getFumbleTextAndTotal', $NightWizard_getFumbleTextAndTotal$10 = function $$getFumbleTextAndTotal(base, _modify, dice_str) {
      var self = this, total = nil, text = nil;

      
      total = base;
      total = $rb_plus(total, -10);
      text = "" + (base) + "-10[" + (dice_str) + "]";
      return [text, total];
    }, $NightWizard_getFumbleTextAndTotal$10.$$arity = 3);
    
    Opal.def(self, '$setCriticalValues', $NightWizard_setCriticalValues$11 = function $$setCriticalValues(text) {
      var self = this;

      return (self.criticalValues = self.$getValuesFromText(text, [10]))
    }, $NightWizard_setCriticalValues$11.$$arity = 1);
    
    Opal.def(self, '$getValuesFromText', $NightWizard_getValuesFromText$12 = function $$getValuesFromText(text, default$) {
      var $$13, self = this;

      
      if (text['$==']("0")) {
        return default$};
      return $send(text.$split(/,/), 'collect', [], ($$13 = function(i){var self = $$13.$$s || this;

      
        
        if (i == null) {
          i = nil;
        };
        return i.$to_i();}, $$13.$$s = self, $$13.$$arity = 1, $$13));
    }, $NightWizard_getValuesFromText$12.$$arity = 2);
    
    Opal.def(self, '$checkCritical', $NightWizard_checkCritical$14 = function $$checkCritical(total, dice_str, dice_n) {
      var $a, $b, $c, self = this, output = nil, criticalText = nil, criticalValue = nil;

      
      self.$debug("addRollWhenCritical begin total, dice_str", total, dice_str);
      output = total.$to_s();
      criticalText = "";
      criticalValue = self.$getCriticalValue(dice_n);
      while ($truthy(criticalValue)) {
        
        total = $rb_plus(total, 10);
        output = $rb_plus(output, "" + "+10[" + (dice_str) + "]");
        criticalText = "＞ クリティカル ";
        $c = self.$roll(2, 6, 0), $b = Opal.to_ary($c), (dice_n = ($b[0] == null ? nil : $b[0])), (dice_str = ($b[1] == null ? nil : $b[1])), $c;
        criticalValue = self.$getCriticalValue(dice_n);
        self.$debug("criticalValue", criticalValue);
      };
      total = $rb_plus(total, dice_n);
      output = $rb_plus(output, "" + "+" + (dice_n) + "[" + (dice_str) + "] " + (criticalText) + "＞ " + (total));
      return [total, output];
    }, $NightWizard_checkCritical$14.$$arity = 3);
    return (Opal.def(self, '$getCriticalValue', $NightWizard_getCriticalValue$15 = function $$getCriticalValue(dice_n) {
      var self = this;

      return self.criticalValues['$include?'](dice_n)
    }, $NightWizard_getCriticalValue$15.$$arity = 1), nil) && 'getCriticalValue';
  })($nesting[0], $$($nesting, 'DiceBot'), $nesting);
})(Opal);
