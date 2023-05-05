import { Button, Input } from "antd-mobile";
import { useEffect, useState } from "react";
import './index.less';
import Loading from "@/components/loading/loding";
import { GetSkey, GetUsers } from "@/request";
import useAddUserDialog from "@/components/AddUserDialog";

const UserItem = (props: {info: any}) => {
    return <>
        <div>
            <span>name</span>
            <span>到期时间</span>
        </div>
    </>
}

const GenSkey = () => {
    const [name, setName] = useState('');
    const { loading, show } = useAddUserDialog();
    const [users, setUsers] = useState<any[]>([1,1,1,1,1,1,1]);

    const onChange = (value: string) => {
        setName(value);
    }

    const addUser = () => {
        show();
    }

    useEffect(() => {
        GetUsers({}).then(data => {

        })
    }, [])

    return <>
        <div className="add-user">
            <div className="add-user-operate">
                <span className="button" onClick={addUser}>添加用户</span>
                <span>共：人</span>
            </div>
            <div className="user-list">
                {users.map(item => {
                    return <UserItem info={item}></UserItem>
                })}
            </div>
        </div>
        {loading && <Loading></Loading>}
    </>
}

export default GenSkey;
