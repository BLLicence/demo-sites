import { T } from '@angular/cdk/keycodes';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Link, TableOfContentComponent } from '@esedit-md/shared-ui';

@Component({
  selector: 'bl-table-of-contents-sample',
  templateUrl: './bl-table-of-contents-sample.component.html',
  styleUrls: ['./bl-table-of-contents-sample.component.scss'],
})
export class BlTableContentSampleComponent implements OnInit {
  @ViewChild('toc', { static: true }) tableOfContents: TableOfContentComponent;
  @ViewChild('tocContainer', { static: true }) tocContainer: ElementRef;
  @ViewChild('topRoot') topElementRef!: ElementRef; //you can define your ElementRef and pass it as Input (microFront case)



  ngOnInit(): void {
    if (this.tableOfContents && this.tocContainer) {
      this.tableOfContents.containerLinks = this.tocContainer;
      this.tableOfContents.updateScrollPosition();
    }

  }




}
