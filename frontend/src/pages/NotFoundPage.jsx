import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return <div>{t('notFoundPage.not_found')}</div>;
};
export { NotFoundPage };
