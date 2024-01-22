import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetList } from '~/hooks';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import MInputSearch from '~molecules/m-input-search';
import OTable from '~organisms/o-table';
import { quizActions } from '~store/quiz/quiz.slice';
import { IQuiz, TFilterParams } from '~types';
import { getNoTable, getTotal } from '~utils/tableHelper';

interface IQuizTables extends IQuiz {
  key: string | number;
}

export default function QuizList() {
  const navigate = useNavigate();
  const [paramsQuery, setParamsQuery] = React.useState<TFilterParams<IQuiz>>({
    current_page: 1,
    per_page: 10,
  });

  const [dataQuizList, setDataQuizList] = React.useState<Array<IQuizTables>>([]);

  const {
    listData: listQuiz,
    pagination,
    loading,
  } = useGetList<IQuiz[]>({
    params: paramsQuery,
    action: quizActions,
    nameState: 'quiz',
  });

  const columns: ColumnsType<IQuizTables> = [
    {
      title: '',
      dataIndex: 'index',
      render: (_: unknown, record: IQuiz, index: number) => (
        <span>{getNoTable(index, pagination?.current_page, pagination?.per_page)}</span>
      ),
    },
    {
      title: 'タイトル',
      dataIndex: 'title',
    },
    {
      title: '施設名',
      dataIndex: 'question',
    },
    {
      dataIndex: 'action',
      render: (_: unknown, record: IQuiz) => (
        <div className="dis-flex ai-flex-center jc-center">
          <AButton
            size="small"
            className="h-32 w-97 gray-80"
            onClick={() => record?.id && onNavigateDetail(record.id)}
            type="primary"
            data-testid="btn-preview"
          >
            詳細
          </AButton>
        </div>
      ),
    },
  ];

  const onNavigateDetail = (id: number) => {
    navigate(`${APP_ROUTE_URL.QUIZ.EDIT}?id=${id}`);
  };
  const onNavigateCreateCoupon = () => {
    navigate(APP_ROUTE_URL.QUIZ.CREATE);
  };

  useEffect(() => {
    if (Array.isArray(listQuiz)) {
      setDataQuizList(() => {
        return listQuiz.map((item) => {
          return {
            ...item,
            key: item.id,
          } as IQuizTables;
        });
      });
    }
  }, [listQuiz]);

  return (
    <div className="gray fs-20">
      <div className="dis-flex mb-10 ai-center jc-space-between mb-30">
        <div className="dis-flex ai-center">
          {/* <h4 className="mr-10">施設:</h4>{' '}
          <MInputSearch setParamsQuery={setParamsQuery} paramsQuery={paramsQuery} /> */}
        </div>
        <AButton
          size="middle"
          onClick={onNavigateCreateCoupon}
          type="primary"
          leftIcon={<PlusCircleOutlined />}
        >
          新規登録
        </AButton>
      </div>
      <OTable
        columns={columns}
        dataSource={dataQuizList}
        pageSize={pagination?.per_page}
        total={getTotal(pagination?.total_page, pagination?.per_page)}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
        loading={loading}
      />
    </div>
  );
}
