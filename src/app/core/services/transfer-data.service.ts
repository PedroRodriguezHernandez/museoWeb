import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataTransferService {
  private data: any;
  private datas: any[] = [];

  setDataList(data:any[]){
    this.datas = data
  }
  getDataList(){
    return this.datas
  }
  setData(data: any) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  clearData() {
    this.data = null;
    this.datas = []
  }
}
