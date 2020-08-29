/* Generated by Opal 1.0.3 */
(function(Opal) {
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy;

  Opal.add_stubs(['$setPrefixes', '$gsub', '$last_match', '$nechronica_check', '$==', '$>=', '$count', '$<=', '$>', '$size', '$debug', '$=~', '$to_i', '$parren_killer', '$roll', '$+', '$<', '$to_s', '$map', '$split', '$to_proc', '$map!', '$join', '$check_nD10', '$getHitLocation', '$!=', '$-', '$[]']);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Nechronica');

    var $nesting = [self].concat($parent_nesting), $Nechronica_initialize$1, $Nechronica_changeText$2, $Nechronica_dice_command_xRn$7, $Nechronica_check_nD10$8, $Nechronica_nechronica_check$10, $Nechronica_getHitLocation$12;

    self.$$prototype.nick_e = nil;
    
    Opal.const_set($nesting[0], 'ID', "Nechronica");
    Opal.const_set($nesting[0], 'NAME', "ネクロニカ");
    Opal.const_set($nesting[0], 'SORT_KEY', "ねくろにか");
    Opal.const_set($nesting[0], 'HELP_MESSAGE', "" + "・判定　(nNC+m)\n" + "　ダイス数n、修正値mで判定ロールを行います。\n" + "　ダイス数が2以上の時のパーツ破損数も表示します。\n" + "・攻撃判定　(nNA+m)\n" + "　ダイス数n、修正値mで攻撃判定ロールを行います。\n" + "　命中部位とダイス数が2以上の時のパーツ破損数も表示します。\n");
    self.$setPrefixes(["(\\d+NC|\\d+NA)"]);
    
    Opal.def(self, '$initialize', $Nechronica_initialize$1 = function $$initialize() {
      var $iter = $Nechronica_initialize$1.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;

      if ($iter) $Nechronica_initialize$1.$$p = null;
      // Prepare super implicit arguments
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $Nechronica_initialize$1, false), $zuper, $iter);
      self.sendMode = 2;
      self.sortType = 3;
      return (self.defaultSuccessTarget = "6");
    }, $Nechronica_initialize$1.$$arity = 0);
    
    Opal.def(self, '$changeText', $Nechronica_changeText$2 = function $$changeText(string) {
      var $$3, $$4, $$5, $$6, self = this;

      
      string = $send(string, 'gsub', [/(\d+)NC(10)?([\+\-][\+\-\d]+)/i], ($$3 = function(){var self = $$3.$$s || this;

      return "" + ($$($nesting, 'Regexp').$last_match(1)) + "R10" + ($$($nesting, 'Regexp').$last_match(3)) + "[0]"}, $$3.$$s = self, $$3.$$arity = 0, $$3));
      string = $send(string, 'gsub', [/(\d+)NC(10)?/i], ($$4 = function(){var self = $$4.$$s || this;

      return "" + ($$($nesting, 'Regexp').$last_match(1)) + "R10[0]"}, $$4.$$s = self, $$4.$$arity = 0, $$4));
      string = $send(string, 'gsub', [/(\d+)NA(10)?([\+\-][\+\-\d]+)/i], ($$5 = function(){var self = $$5.$$s || this;

      return "" + ($$($nesting, 'Regexp').$last_match(1)) + "R10" + ($$($nesting, 'Regexp').$last_match(3)) + "[1]"}, $$5.$$s = self, $$5.$$arity = 0, $$5));
      string = $send(string, 'gsub', [/(\d+)NA(10)?/i], ($$6 = function(){var self = $$6.$$s || this;

      return "" + ($$($nesting, 'Regexp').$last_match(1)) + "R10[1]"}, $$6.$$s = self, $$6.$$arity = 0, $$6));
      return string;
    }, $Nechronica_changeText$2.$$arity = 1);
    
    Opal.def(self, '$dice_command_xRn', $Nechronica_dice_command_xRn$7 = function $$dice_command_xRn(string, nick_e) {
      var self = this;

      
      self.nick_e = nick_e;
      return self.$nechronica_check(string);
    }, $Nechronica_dice_command_xRn$7.$$arity = 2);
    
    Opal.def(self, '$check_nD10', $Nechronica_check_nD10$8 = function $$check_nD10(total, _dice_total, dice_list, cmp_op, target) {
      var $$9, self = this;

      
      if (target['$==']("?")) {
        return ""};
      if (cmp_op['$=='](">=")) {
      } else {
        return ""
      };
      if ($truthy($rb_ge(total, 11))) {
        return " ＞ 大成功"
      } else if ($truthy($rb_ge(total, target))) {
        return " ＞ 成功"
      } else if ($send(dice_list, 'count', [], ($$9 = function(i){var self = $$9.$$s || this;

      
        
        if (i == null) {
          i = nil;
        };
        return $rb_le(i, 1);}, $$9.$$s = self, $$9.$$arity = 1, $$9))['$=='](0)) {
        return " ＞ 失敗"
      } else if ($truthy($rb_gt(dice_list.$size(), 1))) {
        return " ＞ 大失敗 ＞ 使用パーツ全損"
      } else {
        return " ＞ 大失敗"
      };
    }, $Nechronica_check_nD10$8.$$arity = 5);
    
    Opal.def(self, '$nechronica_check', $Nechronica_nechronica_check$10 = function $$nechronica_check(string) {
      var $a, $b, $$11, self = this, output = nil, dice_n = nil, battleMode = nil, modText = nil, mod = nil, isBattleMode = nil, diff = nil, total_n = nil, _ = nil, dice_str = nil, _n1 = nil, _cnt_max = nil, n_max = nil, dice = nil, hit_loc = nil;

      
      output = "1";
      self.$debug("nechronica_check string", string);
      if ($truthy(/(^|\s)S?((\d+)[rR]10([\+\-\d]+)?(\[(\d+)\])?)(\s|$)/i['$=~'](string))) {
      } else {
        
        self.$debug("nechronica_check unmuched");
        return output;
      };
      string = $$($nesting, 'Regexp').$last_match(2);
      dice_n = 1;
      if ($truthy($$($nesting, 'Regexp').$last_match(3))) {
        dice_n = $$($nesting, 'Regexp').$last_match(3).$to_i()};
      battleMode = $$($nesting, 'Regexp').$last_match(6).$to_i();
      modText = $$($nesting, 'Regexp').$last_match(4);
      mod = self.$parren_killer("" + "(0" + (modText) + ")").$to_i();
      isBattleMode = battleMode['$=='](1);
      self.$debug("nechronica_check string", string);
      self.$debug("isBattleMode", isBattleMode);
      diff = 6;
      total_n = 0;
      $b = self.$roll(dice_n, 10, 1), $a = Opal.to_ary($b), (_ = ($a[0] == null ? nil : $a[0])), (dice_str = ($a[1] == null ? nil : $a[1])), (_n1 = ($a[2] == null ? nil : $a[2])), (_cnt_max = ($a[3] == null ? nil : $a[3])), (n_max = ($a[4] == null ? nil : $a[4])), $b;
      total_n = $rb_plus(n_max, mod);
      output = "" + (self.nick_e) + ": (" + (string) + ") ＞ [" + (dice_str) + "]";
      if ($truthy($rb_lt(mod, 0))) {
        output = $rb_plus(output, mod.$to_s())
      } else if ($truthy($rb_gt(mod, 0))) {
        output = $rb_plus(output, "" + "+" + (mod))};
      dice = $send(dice_str.$split(","), 'map', [], "to_i".$to_proc());
      $send(dice, 'map!', [], ($$11 = function(i){var self = $$11.$$s || this;

      
        
        if (i == null) {
          i = nil;
        };
        return $rb_plus(i, mod);}, $$11.$$s = self, $$11.$$arity = 1, $$11));
      dice_str = dice.$join(",");
      output = $rb_plus(output, "" + "  ＞ " + (total_n) + "[" + (dice_str) + "]");
      output = $rb_plus(output, self.$check_nD10(total_n, dice_n, dice, ">=", diff));
      if ($truthy(isBattleMode)) {
        
        hit_loc = self.$getHitLocation(total_n);
        if ($truthy(hit_loc['$!=']("1"))) {
          output = $rb_plus(output, "" + " ＞ " + (hit_loc))};};
      return output;
    }, $Nechronica_nechronica_check$10.$$arity = 1);
    return (Opal.def(self, '$getHitLocation', $Nechronica_getHitLocation$12 = function $$getHitLocation(dice) {
      var self = this, output = nil, table = nil, index = nil, addDamage = nil;

      
      output = "1";
      self.$debug("getHitLocation dice", dice);
      if ($truthy($rb_le(dice, 5))) {
        return output};
      output = "";
      table = ["防御側任意", "脚（なければ攻撃側任意）", "胴（なければ攻撃側任意）", "腕（なければ攻撃側任意）", "頭（なければ攻撃側任意）", "攻撃側任意"];
      index = $rb_minus(dice, 6);
      addDamage = "";
      if ($truthy($rb_gt(dice, 10))) {
        
        index = 5;
        addDamage = "" + "(追加ダメージ" + ($rb_minus(dice, 10)) + ")";};
      output = $rb_plus(table['$[]'](index), addDamage);
      return output;
    }, $Nechronica_getHitLocation$12.$$arity = 1), nil) && 'getHitLocation';
  })($nesting[0], $$($nesting, 'DiceBot'), $nesting)
})(Opal);
