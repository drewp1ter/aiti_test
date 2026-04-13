'use client'

import { Input, Icon } from '@/shared/ui'
import styles from './Header.module.scss'
import cn from 'clsx'

interface Props {
  className?: string
}

export function Header({ className }: Props) {
  return (
    <div className={cn(styles.header, className)}>
      <h1 className={styles.title}>Товары</h1>
      <Input className='w-5xl' variant='secondary' variantSize='48' placeholder='Найти'>
        <Input.Prefix>
           <Icon.Search />
        </Input.Prefix>
      </Input>
    </div>  
  )
}