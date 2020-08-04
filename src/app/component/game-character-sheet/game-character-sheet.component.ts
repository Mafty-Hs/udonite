import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { EventSystem, Network } from '@udonarium/core/system';
import { DataElement } from '@udonarium/data-element';
import { PresetSound, SoundEffect } from '@udonarium/sound-effect';
import { TabletopObject } from '@udonarium/tabletop-object';

import { FileSelecterComponent } from 'component/file-selecter/file-selecter.component';
import { ModalService } from 'service/modal.service';
import { PanelService } from 'service/panel.service';
import { SaveDataService } from 'service/save-data.service';

import { UUID } from '@udonarium/core/system/util/uuid';

@Component({
  selector: 'game-character-sheet',
  templateUrl: './game-character-sheet.component.html',
  styleUrls: ['./game-character-sheet.component.css']
})
export class GameCharacterSheetComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() tabletopObject: TabletopObject = null;
  isEdit: boolean = false;

  networkService = Network;
  MAX_FACE_ICON_COUNT = 5;

  constructor(
    private saveDataService: SaveDataService,
    private panelService: PanelService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    EventSystem.register(this)
      .on('DELETE_GAME_OBJECT', -1000, event => {
        if (this.tabletopObject && this.tabletopObject.identifier === event.data.identifier) {
          this.panelService.close();
        }
      });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    EventSystem.unregister(this);
  }

  toggleEditMode() {
    this.isEdit = this.isEdit ? false : true;
  }

  addDataElement() {
    if (this.tabletopObject.detailDataElement) {
      let title = DataElement.create('見出し', '', {});
      let tag = DataElement.create('タグ', '', {});
      title.appendChild(tag);
      this.tabletopObject.detailDataElement.appendChild(title);
    }
  }

  clone() {
    let cloneObject = this.tabletopObject.clone();
    cloneObject.location.x += 50;
    cloneObject.location.y += 50;
    if (this.tabletopObject.parent) this.tabletopObject.parent.appendChild(cloneObject);
    cloneObject.update();
    switch (this.tabletopObject.aliasName) {
      case 'terrain':
        SoundEffect.play(PresetSound.blockPut);
        (cloneObject as any).isLocked = false;
        break;
      case 'card':
      case 'card-stack':
        (cloneObject as any).owner = '';
        (cloneObject as any).toTopmost();
      case 'table-mask':
        (cloneObject as any).isLock = false;
        SoundEffect.play(PresetSound.cardPut);
        break;
      case 'text-note':
        (cloneObject as any).toTopmost();
        SoundEffect.play(PresetSound.cardPut);
        break;
      case 'dice-symbol':
        SoundEffect.play(PresetSound.dicePut);
      default:
        SoundEffect.play(PresetSound.piecePut);
        break;
    }
  }

  saveToXML() {
    if (!this.tabletopObject) return;

    let element = this.tabletopObject.getElement('name', this.tabletopObject.commonDataElement);
    let objectName: string = element ? <string>element.value : '';

    this.saveDataService.saveGameObject(this.tabletopObject, 'xml_' + objectName);
  }

  setLocation(locationName: string) {
    this.tabletopObject.setLocation(locationName);
  }

  openModal(name: string = '', isAllowedEmpty: boolean = false) {
    this.modalService.open<string>(FileSelecterComponent, { isAllowedEmpty: isAllowedEmpty }).then(value => {
      console.log(value == 'null');
      if (!this.tabletopObject || !this.tabletopObject.imageDataElement || !value) return;
      if (name === 'faceIcon') {
        let elements = this.tabletopObject.imageDataElement.getElementsByName(name);
        if (elements.length >= this.MAX_FACE_ICON_COUNT) {
          for (let i = this.MAX_FACE_ICON_COUNT; i < elements.length; i++) {
            this.deleteIcon(i);
          }
          elements[this.MAX_FACE_ICON_COUNT - 1].value = value;
        } else {
          this.tabletopObject.imageDataElement.appendChild(DataElement.create('faceIcon', value, { type: 'image' }, 'faceIcon_' + UUID.generateUuid()));
        }
        if (this.tabletopObject.currntIconIndex < 0) this.tabletopObject.currntIconIndex = 0;
      } else {
        let element = this.tabletopObject.imageDataElement.getFirstElementByName(name);
        if (element) {
          element.value = value;
        } else if (name == 'shadowImageIdentifier') {
          this.tabletopObject.imageDataElement.appendChild(DataElement.create(name, value, { type: 'image' }, name + '_' + UUID.generateUuid()));
        } else {
          return;
        }
      }
    });
    EventSystem.trigger('UPDATE_GAME_OBJECT', this.tabletopObject);
  }

  selectIcon(index: number) {
    if (this.tabletopObject.currntIconIndex == index) return;
    this.tabletopObject.currntIconIndex = index;
  }

  deleteIcon(index: number=0) {
    if (!this.tabletopObject || !this.tabletopObject.imageDataElement) return;
    let elements = this.tabletopObject.imageDataElement.getElementsByName('faceIcon');
    if (elements && 0 < elements.length && index < elements.length) {
      if (this.tabletopObject.currntIconIndex >= index) this.tabletopObject.currntIconIndex -= 1;
      if (this.tabletopObject.currntIconIndex < 0) this.tabletopObject.currntIconIndex = 0;
      this.tabletopObject.imageDataElement.removeChild(elements[index]);
      //if (sound) SoundEffect.play(PresetSound.sweep);
    }
  }
}
