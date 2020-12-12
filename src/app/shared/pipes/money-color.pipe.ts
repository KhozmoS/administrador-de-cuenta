import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyColor'
})
export class MoneyColorPipe implements PipeTransform {

  transform(value: number, themeDefaultColor = "#000000"): string {
    return this.balanceColor(value, themeDefaultColor)  
  }
  private balanceColor(balance: number, themeDefaultColor = "#000000"): string {
    if (balance > 0) {
      // custom green
      return "#1bff56";
    } else if (balance < 0) {
      // curstom red
      return "#e23939";
    } else {      
      return themeDefaultColor;
    }
  }

}
