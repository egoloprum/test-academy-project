import { Button } from '@/shared/ui/Button'

import styles from './LinkExpiredModal.module.scss'

export const LinkExpiredModal = ({}) => {
  const classNameWrapper = styles['link-expired-wrapper']
  const classNameTextFrame = styles['link-expired-text-frame']
  const classNameBtn = styles['link-expired-btn']

  return (
    <div className={classNameWrapper}>
      <div className={classNameTextFrame}>
        <h1>Истек срок действия ссылки</h1>
        <p>Зарегистрируйтесь снова</p>
      </div>
      <Button
        buttonSize="large"
        mode="primary"
        className={classNameBtn}
        href="/register">
        Зарегистрироваться
      </Button>
    </div>
  )
}
