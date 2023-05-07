import { useEffect, useState } from "react";
import './index.less';
import Loading from "@/components/loading/loding";
import { DeleteUser, GetSkey, GetUsers, UpdateUser } from "@/request";
import useAddUserDialog from "@/components/AddUserDialog";
import eventBus from "@/utils/eventBus";
import { formatDate } from "@/utils";
import { Modal } from "antd-mobile";

const UserItem = (props: {info: any}) => {
    const { info } = props;
    const [loading, setLoading] = useState(false);

    const validateDate = (createdTime: string, m: number) => {
        const createDate = (new Date(createdTime)).getTime();
        const endTime = createDate + 30 * 24 * 60 * 60 * 1000 * m;
        if (endTime < Date.now()) return '已过期';
        return formatDate(endTime, 'Y-M-D')
    }

    const deleteUser = ()=> {

        Modal.confirm({
            content: '确定删除该用户吗？',
            onConfirm: () => {
                setLoading(true);
                DeleteUser({id: info.id}).then(data => {
                    eventBus.emit('refreshUser');
                }).finally(() => {
                    setLoading(false);
                })
            }
        })

    } 

    const updateUser = () => {
        Modal.confirm({
            content: `确定将该用户延长至？${validateDate(info.createdAt, +info.validityM + 1)}吗？`,
            onConfirm: () => {
                setLoading(true);
                UpdateUser({name: info.name, validityM: info.validityM + 1}).then(data => {
                    eventBus.emit('refreshUser');
                }).finally(() => {
                    setLoading(false);
                });
            }
        })
    }

    return <>
        <div>
            <span>{info.name}</span>
            <span>到期时间: {validateDate(info.createdAt, +info.validityM)}</span>
            <div>
                <span className="delete-button" onClick={deleteUser}>删除</span>
                <span className="extend-button" onClick={updateUser}>延长一个月</span>
            </div>
        </div>
        {loading && <Loading></Loading>}
    </>
}

const GenSkey = () => {
    const [name, setName] = useState('');
    const { loading, show } = useAddUserDialog();
    const [users, setUsers] = useState<any[]>([]);
    const [total , setTotal] = useState(0);

    const onChange = (value: string) => {
        setName(value);
    }

    const addUser = () => {
        show();
    }

    const getUsers = () => {
        GetUsers({}).then(data => {
            if (data.status === 0) {
                setUsers(data.data);
                setTotal(data.data.filter((item: any) => !item.isAdmin).length)
            }
        })
    }

    useEffect(() => {
        getUsers();
        eventBus.on('refreshUser', () => {
            getUsers();
        })
    }, [])

    return <>
        <div className="add-user">
            <div className="add-user-operate">
                <span className="button" onClick={addUser}>添加用户</span>
                <span>共：{total}人</span>
            </div>
            <div className="user-list">
                {users.filter(item => {
                    return !item.isAdmin
                }).map(item => {
                    return <UserItem info={item}></UserItem>
                })}
            </div>
        </div>
        {loading && <Loading></Loading>}
    </>
}

export default GenSkey;
