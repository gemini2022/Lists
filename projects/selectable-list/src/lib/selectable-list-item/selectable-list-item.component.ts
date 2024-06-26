import { Component, ElementRef, OutputRefSubscription, output, viewChild } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { SecondarySelectionType } from '../secondary-selection-type';
import { ListItemComponent } from 'list';

@Component({
  selector: 'selectable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selectable-list-item.component.html',
  styleUrls: ['./../../../../list/src/lib/list-item/list-item.component.scss', './selectable-list-item.component.scss']
})
export class SelectableListItemComponent extends ListItemComponent {
  public hasPrimarySelection: boolean = false;
  public hasSecondarySelection: boolean = false;
  public clickSubscription!: OutputRefSubscription;
  public stopMouseDownPropagation: boolean = false;
  public mouseDownSubscription!: OutputRefSubscription;
  public rightClickSubscription!: OutputRefSubscription;
  public hasPrimarySelectionBorderOnly: boolean = false;
  public secondarySelectionType!: SecondarySelectionType;
  public doubleClickSubscription!: OutputRefSubscription;
  protected SecondarySelectionType = SecondarySelectionType;
  public clickedEvent = output<SelectableListItemComponent>();
  public rightClickedEvent = output<SelectableListItemComponent>();
  public doubleClickedEvent = output<SelectableListItemComponent>();
  public htmlElement = viewChild<ElementRef<HTMLElement>>('htmlElement');
  public mouseDownedEvent = output<KeyValue<SelectableListItemComponent, boolean>>();


  protected onMouseDown(e: MouseEvent) {
    this.stopMouseDownPropagation = true;
    this.mouseDownedEvent.emit({ key: this, value: e.button === 2 });
  }



  public clearSelection(primarySelectedItemIsBorderOnly?: boolean) {
    this.hasPrimarySelection = false;
    this.secondarySelectionType = null!;
    if (!primarySelectedItemIsBorderOnly) this.hasSecondarySelection = false;
  }
}