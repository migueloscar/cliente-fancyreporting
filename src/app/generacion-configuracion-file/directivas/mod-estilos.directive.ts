import { Directive,ElementRef,Input,Renderer } from '@angular/core';

@Directive({
  selector: '[modEstilos]'
})
export class ModEstilosDirective {

  constructor(
    public element: ElementRef,
    public renderer: Renderer
  ) { }
@Input() case:string;
@Input() fontWeight: string;

ngOnInit(){
  this.renderer.setElementStyle(this.element.nativeElement,'text-transform',this.case);
  this.renderer.setElementStyle(this.element.nativeElement,'font-weight',this.fontWeight);
}

}