/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useI18n from '@/utils/hooks/useI18n';
import { useVisible } from '@/utils/hooks/useVisible';
import { StringIndexMap } from '@/type';
import CoInfoModal from '@/components/Modals/CoInfoModal';
import UserInfoModal from '@/components/Modals/UserInfoModal';
import SubInfoModal from '@/components/Modals/SubInfoModal';
import SegmentInfoModal from '@/components/Modals/SegmentModal';
import ImageModal from '@/components/Modals/ImageModal';
import { useModel } from 'umi';
import { PathName } from '@/routes';
import Permission from '@/components/Permission';

interface ButtonProps {
  style?: StringIndexMap;
  text?: string;
  onComplete: (visible: boolean, saved?: boolean) => void;
}

const useModal = () => {
  const { currentPath } = useModel('history');
  switch (currentPath) {
    case PathName.user:
      return UserInfoModal;
    case PathName.subManager:
      return SubInfoModal;
    case PathName.virtualNetworkSegment:
      return SegmentInfoModal;
    case PathName.image:
      return ImageModal;
    default:
      return CoInfoModal;
  }
};

const AddCoButton = (props: ButtonProps) => {
  const I18n = useI18n();
  const { style = {}, onComplete, text = 'add' } = props;
  const { visible, setVisible, onChange } = useVisible();
  const LModal = useModal();

  const onClick = () => {
    setVisible(true);
  };

  const _onChange = (visible: boolean, saved?: boolean) => {
    onChange(visible);
    onComplete(visible, saved);
  };

  return (
    <>
      <Button
        onClick={onClick}
        style={style}
        type="primary"
        icon={<PlusOutlined />}
      >
        {I18n(text)}
      </Button>
      <LModal visible={visible} onChange={_onChange} />
    </>
  );
};

export default AddCoButton;
