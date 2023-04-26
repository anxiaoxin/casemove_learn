import { Button, Input } from "antd-mobile";
import { useEffect, useState } from "react";
import './index.less';
import Loading from "@/components/loading/loding";
import { GetSkey } from "@/request";

const GenSkey = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [key, setKey] = useState('');
    const onChange = (value: string) => {
        setName(value);
    }

     const getSkey = () => {
        if (!name) return;
        GetSkey({name}).then((res) => {
          if (res.status === 0) {
            setKey(res.data);
          }
        })
    }

    return <>
        <div className="genkey-container">
            <div>
                <div>
                    <Input onChange={onChange} style={{border: '1px solid #cac8c8', borderRadius: '4%', padding: 4, '--color': 'white'}} placeholder="请输入steam用户名" value={name}></Input>
                </div>
                <div className="button" onClick={getSkey}>生成</div>
            </div>
            {
                key && <div className="skey">
                <div id="skey" >{key}</div>
                <div  className="copy" >长按文本复制</div>
            </div>
            }

        </div>
        {loading && <Loading></Loading>}
    </>
}

export default GenSkey;
