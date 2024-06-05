import React, { useEffect, useState } from 'react';
import ButtonHelper, { Button, EventFlavor } from '../helpers/ButtonHelper';

const ViewManager = (): JSX.Element => {
  const [viewStack, setViewStack] = useState(['default']);
  const buttonHelper = new ButtonHelper();

  useEffect(() => {
    const handleButtonPress = (btn: Button, flv: EventFlavor) => {
      if (flv === EventFlavor.Up) {
        const newStack = [...viewStack];
        let newView = '';
        switch (btn) {
          case Button.BUTTON_1:
            newView = 'view1';
            break;
          case Button.BUTTON_2:
            newView = 'view2';
            break;
          case Button.BUTTON_3:
            newView = 'view3';
            break;
          case Button.BUTTON_4:
            newView = 'view4';
            break;
          case Button.FRONT_BUTTON:
            if (newStack.length > 1) {
              newStack.pop();
            }
            break;
          default:
            break;
        }
        if (newView && newView !== newStack[newStack.length - 1]) {
          newStack.push(newView);
        }
        setViewStack(newStack);
      }
    };

    const noOpCallback = () => {};

    buttonHelper.setCallback(handleButtonPress);

    return () => {
      buttonHelper.setCallback(noOpCallback);
    };
  }, [buttonHelper, viewStack]);

  const renderView = () => {
    const currentView = viewStack[viewStack.length - 1];
    switch (currentView) {
      case 'view1':
        return <div>View 1</div>;
      case 'view2':
        return <div>View 2</div>;
      case 'view3':
        return <div>View 3</div>;
      case 'view4':
        return <div>View 4</div>;
      default:
        return <div>Default View</div>;
    }
  };

  return <div>{renderView()}</div>;
};

export default ViewManager;
