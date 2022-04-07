import { EventSystem } from '@udonarium/core/system';
import { Injectable } from '@angular/core';
import { ObjectSerializer } from '@udonarium/core/synchronize-object/object-serializer';

import { BillBoard } from '@udonarium/bill-board';
import { BillBoardCard } from '@udonarium/bill-board-card';
import { ChatTab } from '@udonarium/chat-tab';
import { ChatTabList } from '@udonarium/chat-tab-list';
import { CutIn } from '@udonarium/cut-in';
import { CutInList } from '@udonarium/cut-in-list';
import { Counter } from '@udonarium/counter';
import { CounterList } from '@udonarium/counter-list';
import { DiceRollTable } from '@udonarium/dice-roll-table';
import { DiceRollTableList } from '@udonarium/dice-roll-table-list';
import { Room } from '@udonarium/room';

import { PlayerService } from './player.service';
import { RoomService } from './room.service';
import { CounterService } from './counter.service';
import { BillBoardService } from './bill-board.service';
import { TabletopObject } from '@udonarium/tabletop-object';
import { GameTable } from '@udonarium/game-table';
import { GameCharacter } from '@udonarium/game-character';



@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  roomNodeList:string[] = [
    'bill-board',
    'chat-tab-list',
    'counter-list',
    'cut-in-list',
    'dice-roll-table-list',
    'summary-setting'
  ];
  tableTopNodeList:string[] = [
    'card',
    'card-stack',
    'character',
    'dice-symbol',
    'table-mask',
    'terrain',
    'text-note'
  ];
  otherNodeList:string[] = [
    'bill-board-card',
    'chat-tab',
    'cut-in',
    'counter',
    'dice-roll-table',
    'game-table'
  ];

  loadData(xmlElement :Element):void {
    let nodeName = xmlElement.nodeName;
    switch (true) {
      case (nodeName == 'room'):
        this.parseRoomData(xmlElement)
        break;
      case (this.tableTopNodeList.includes(nodeName)):
        this.tabletopDataLoad(xmlElement ,nodeName);
        break;
      case (this.roomNodeList.includes(nodeName)):
        this.roomDataLoad(xmlElement ,nodeName);
        break;
      case (this.otherNodeList.includes(nodeName)):
        this.otherDataLoad(xmlElement ,nodeName);
        break;
      default:
        return;
    };
  }

  tabletopDataLoad(xmlElement :Element ,nodeName :string):void {
    if (this.roomService.disableTabletopLoad) return;
    let gameObject = ObjectSerializer.instance.parseXml(xmlElement);
    if (this.playerService.isHideCharacterOnLoad && (gameObject instanceof GameCharacter)) {
      gameObject.owner = this.playerService.myPlayer.playerId;
    }
    EventSystem.trigger('TABLETOP_OBJECT_LOADED',gameObject.identifier);
    return;
  }

  roomDataLoad(xmlElement :Element ,nodeName :string):void {
    if (this.roomService.roomAdmin.disableRoomLoad) return;
    let gameObject = ObjectSerializer.instance.parseXml(xmlElement);
    switch (true) {
      case (gameObject instanceof BillBoard):
        this.billBoardService.loadCard(<BillBoard>gameObject);
        break;
      case (gameObject instanceof CounterList):
        this.counterService.loadCounter(<CounterList>gameObject);
        break;
      default:
        return;
    };
    return;
  }

  otherDataLoad(xmlElement :Element ,nodeName :string):void {
    if (this.roomService.disableObjectLoad) return;
    let gameObject = ObjectSerializer.instance.parseXml(xmlElement);
    switch (true) {
      case (gameObject instanceof BillBoardCard):
        gameObject.destroy();
        break;
      case (gameObject instanceof ChatTab):
        ChatTabList.instance.addChatTab(<ChatTab>gameObject);
        break;
      case (gameObject instanceof CutIn):
        CutInList.instance.addCutIn(<CutIn>gameObject);
        break;
      case (gameObject instanceof Counter):
        gameObject.destroy();
        break;
      case (gameObject instanceof DiceRollTable):
        DiceRollTableList.instance.addDiceRollTable(<DiceRollTable>gameObject);
        break;
      case (gameObject instanceof GameTable):
        break;
      default:
        return;
    };
    return;
  }

  parseRoomData(xmlElement :Element):void {
    if (this.roomService.disableTabletopLoad) return;
    let gameObject = ObjectSerializer.instance.parseXml(xmlElement);
    return;
  }

  initialize():void {
    EventSystem.register(this)
      .on('XML_LOADED', event => {
        let xmlElement:Element = event.data.xmlElement;
        this.loadData(xmlElement);
    });
  }

  constructor(
    private counterService: CounterService,
    private billBoardService: BillBoardService,
    private playerService: PlayerService,
    private roomService: RoomService
  ) {
  }
}
