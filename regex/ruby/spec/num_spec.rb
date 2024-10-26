RSpec.describe 'Regular Expression for C++ integer literals' do
  let(:nonzero_decimal_digit) { /[1-9]/ }
  let(:decimal_digit) { /[0-9]/ }
  let(:octal_digit) { /[0-7]/ }
  let(:hex_digit) { /[0-9A-Fa-f]/ }
  let(:binary_digit) { /[01]/ }

  let(:decimal) { /#{nonzero_decimal_digit}(#{decimal_digit}*'#{decimal_digit}+)*#{decimal_digit}*/ }
  let(:octal) { /0#{octal_digit}+/ }
  let(:hex) { /0[xX]#{hex_digit}+/ }
  let(:binary) { /0[bB]#{binary_digit}+/ }

  let(:size) { /[uU]?[lL]{0,2}/ }

  let(:pattern) { /^-?(#{decimal}|#{octal}|#{hex}|#{binary})#{size}?$/ }

  let(:should_pass) { ["1", "-33'000", "4525235", "0xFF", "0b1010", "010", "1ul", "1u", "1ll"] }
  let(:should_fail) { ["'1'", "1'''3", "afed", "+33", "0x", "ul", "lll", "3lll", "3uuull"] }

  describe 'should pass' do
    it 'matches all expected strings' do
      should_pass.each do |str|
        expect(str).to match(pattern)
      end
    end
  end

  describe 'should fail' do
    it 'does not match any of the strings' do
      should_fail.each do |str|
        expect(str).not_to match(pattern)  
      end
    end
  end
end
