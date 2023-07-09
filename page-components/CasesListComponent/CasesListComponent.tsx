import React, { FC, useLayoutEffect } from 'react';
import styles from './CasesListComponent.module.css';
import { useAppDispatch, useStateSelector } from '../../redux/store';
import { fetchCasesList } from '../../redux/slices/casesSlice';
import Error404 from '../../pages/404';
import { CaseCard, Loader } from '../../components';

export const CasesListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { status, casesList } = useStateSelector(state => state.cases);

  useLayoutEffect(() => {
    dispatch(fetchCasesList());
  }, []);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <Error404 />;
  }

  return (
    <div className={styles.CasesListComponent}>
      {casesList.map(c => (
        <CaseCard
          key={c.id}
          title={c.title}
          urlImg={c.imageUrl}
          caseId={c.id}
          color={'gold'}
          price={c.price}
          type={'case'}
        />
      ))}
    </div>
  );
};