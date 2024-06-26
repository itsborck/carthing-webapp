// Remaps the Carthing buttons to events that can be used elsewhere in the code

export enum Button {
  BUTTON_1,
  BUTTON_2,
  BUTTON_3,
  BUTTON_4,
  BUTTON_5,
  SCROLL_LEFT,
  SCROLL_RIGHT,
  SCROLL_PRESS,
  FRONT_BUTTON,
  OTHER,
}

export enum EventFlavor {
  Down,
  Up,
  Long,
  Short,
}

function mapButton(event: string): Button {
  switch (event) {
    case 'Digit1':
      return Button.BUTTON_1;
    case 'Digit2':
      return Button.BUTTON_2;
    case 'Digit3':
      return Button.BUTTON_3;
    case 'Digit4':
      return Button.BUTTON_4;
    case 'KeyM':
      return Button.BUTTON_5;
    case 'Enter':
      return Button.SCROLL_PRESS;
    case 'Escape':
      return Button.FRONT_BUTTON;
    default:
      //throw new Error("I don't know this button " + event);
      return Button.OTHER;
  }
}

function listenerKey(btn: Button, flv: EventFlavor): string {
  return `${btn}_${flv}`;
}

class ButtonHelper {
  listeners: Map<string, ((btn: Button, flv: EventFlavor) => void)[]>;
  buttonStates: { [key: string]: EventFlavor };
  callback: ((btn: Button, flv: EventFlavor) => void) | null = null;

  constructor() {
    this.listeners = new Map();
    this.buttonStates = {};
    document.addEventListener('wheel', this.wheelEventHandler);
    document.addEventListener('keydown', this.keyDownEventHandler);
    document.addEventListener('keyup', this.keyUpEventHandler);
  }

  getButtonStates(): { [key: string]: EventFlavor } {
    return { ...this.buttonStates };
  }

  addListener(btn: Button, flv: EventFlavor, fn: (btn: Button, flv: EventFlavor) => void): void {
    const currentListeners = this.listeners.get(listenerKey(btn, flv)) || [];
    this.listeners.set(listenerKey(btn, flv), [...currentListeners, fn]);
  }
  removeListener(btn: Button, flv: EventFlavor): void {
    this.listeners.delete(listenerKey(btn, flv));
  }

  setCallback(callback: (btn: Button, flv: EventFlavor) => void): void {
    this.callback = callback;
  }

  private wheelEventHandler = (event: WheelEvent) => {
    if (event.deltaX < 0) {
      this.notify(Button.SCROLL_LEFT, EventFlavor.Short);
    } else if (event.deltaX > 0) {
      this.notify(Button.SCROLL_RIGHT, EventFlavor.Short);
    }
  };

  private notify(btn: Button, flv: EventFlavor) {
    const currentListeners = this.listeners.get(listenerKey(btn, flv)) || [];
    for (const listener of currentListeners) {
      listener(btn, flv);
    }
    if (this.callback) {
      this.callback(btn, flv);
    }
  }

  private keyDownEventHandler = (event: KeyboardEvent) => {
    const button = mapButton(event.code);
    this.buttonStates[button] = EventFlavor.Down;
    this.notify(button, EventFlavor.Down);
  };

  private keyUpEventHandler = (event: KeyboardEvent) => {
    const button = mapButton(event.code);
    this.buttonStates[button] = EventFlavor.Up;
    this.notify(button, EventFlavor.Up);
  };
}

export default ButtonHelper;
