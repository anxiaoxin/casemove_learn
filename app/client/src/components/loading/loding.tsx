import { DotLoading, Mask } from "antd-mobile";
import { useState } from "react";
import './index.less';

// 自定义内容
const Loading = () => {
  const [visible, setVisible] = useState(true)
  return (
    <>
      <Mask visible={visible} onMaskClick={() => setVisible(false)}>
        <div className="loading-content" style={{fontSize: 30, textAlign: 'center'}}>
            <DotLoading color="white" />
        </div>
      </Mask>
    </>
  )
}

export default Loading;