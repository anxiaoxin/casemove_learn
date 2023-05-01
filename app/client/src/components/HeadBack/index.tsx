import { history } from 'umi';
import BackImage from '../../../assets/images/back.svg';
import './index.less';

interface PageHeaderProp {
    text: string
}

const PageHeader = (props: PageHeaderProp) => {
    const { text } = props;
    const back = () => {
        history.goBack();
    }

    return <>
        <div className="page-header">
            <img src={BackImage} alt="" onClick={back} />
            {text}
        </div>
    </>
}

export default PageHeader;