import React, { useEffect, useState } from 'react';
import ButtonHelper, { Button, EventFlavor } from '../helpers/ButtonHelper';

const ViewManager = () => {
  const [currentView, setCurrentView] = useState('default');
  const buttonHelper = new ButtonHelper();

  useEffect(() => {
    const handleButtonPress = (btn: Button, flv: EventFlavor) => {
      if (flv === EventFlavor.Up) {
        switch (btn) {
          case Button.BUTTON_1:
            setCurrentView('view1');
            break;
          case Button.BUTTON_2:
            setCurrentView('view2');
            break;
          case Button.BUTTON_3:
            setCurrentView('view3');
            break;
          case Button.BUTTON_4:
            setCurrentView('view4');
            break;
          case Button.FRONT_BUTTON:
            setCurrentView('default');
            break;
          default:
            break;
        }
      }
    };

    const noOpCallback = () => {};

    buttonHelper.setCallback(handleButtonPress);

    return () => {
      buttonHelper.setCallback(noOpCallback);
    };
  }, [buttonHelper]);

  const renderView = () => {
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
