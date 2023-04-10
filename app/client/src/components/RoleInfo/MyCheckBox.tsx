/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import useChanged from '@/utils/hooks/useChanged';
import useI18n from '@/utils/hooks/useI18n';
import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import eventBus from '@/utils/eventBus';

interface PermissionListProps {
  value: string;
  code?: string;
  children?: PermissionListProps[];
  className?: string;
}

interface MyCheckBoxProps {
  config: PermissionListProps;
  updateState?: (index: number, value: number) => void;
  updateIndeterminate?: (value: boolean) => void;
  parentState?: number;
  index?: number;
  deep: number;
  codes: string[];
  className?: string;
  disabled: boolean;
}
const genChildrenState = (children: PermissionListProps[]) => {
  return children.map((item) => {
    return -1;
  });
};

const MyCheckBox = (props: MyCheckBoxProps) => {
  const {
    parentState = 1,
    updateState,
    index = -1,
    deep,
    updateIndeterminate,
    config,
    codes,
    className,
    disabled,
  } = props;
  const { value, children = [] } = props.config;
  const [state, setState] = useState<number>(-1);
  const [childrenState, setChildrenState] = useState(
    genChildrenState(children),
  );
  const I18n = useI18n();

  const onChange = (e: any) => {
    setState(e.target.checked ? 1 : -1);
  };

  useEffect(() => {
    setState(codes.indexOf(config.code!) > -1 ? 1 : -1);
  }, [codes]);

  useChanged(() => {
    if (parentState === 0) return;
    setState(parentState);
  }, [parentState]);

  useChanged(() => {
    if (!childrenState.length) return;
    if (childrenState.every((item) => item === 1)) {
      setState(1);
    } else if (childrenState.every((item) => item === -1)) {
      setState(-1);
    } else {
      setState(0);
    }
  }, [childrenState]);

  useChanged(() => {
    updateState && updateState(index, state);
    if (config.code)
      eventBus.emit('permissionChange', {
        value: state === 1,
        code: config.code,
      });
  }, [state]);

  const updateChildState = (index: number, value: number) => {
    childrenState[index] = value;
    setChildrenState([...childrenState]);
  };

  return (
    <div className={`checkbox-item ${className || ''}`}>
      <Checkbox
        checked={state === 1}
        indeterminate={state === 0}
        onChange={onChange}
        disabled={disabled}
      >
        {I18n(value)}
      </Checkbox>
      {children.length ? (
        <div className={`checkbox-${deep}`}>
          {children.map((item, index) => (
            <MyCheckBox
              index={index}
              deep={deep + 1}
              parentState={state}
              updateState={updateChildState}
              config={item}
              codes={codes}
              disabled={disabled}
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default MyCheckBox;
