import { Subject } from "rxjs";

const subject = new Subject();
const request = new Subject();
const reset = new Subject();
const action = new Subject();
const counter = new Subject();

export const ListenService = {
  setValue: (value, i, j) => subject.next({ value: value, i: i, j: j }),
  onChangeValue: () => subject.asObservable()
};

export const RequestService = {
  requestNumber: (i, j) => request.next({ i: i, j: j }),
  onRequest: () => request.asObservable()
};

export const ActionService = {
  onReset: () => action.asObservable(),
  reset: () => action.next({ action: "reset" }),
  rePlay: () => action.next({ action: "rePlay" }),
  counter: () => action.next({ action: "counter" })
};

export const CounterService = {
  onCounter: () => counter.asObservable(),
  changeCounter: nums => counter.next({ nums: nums })
};
