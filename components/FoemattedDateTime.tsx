import { cn ,formatDateTime} from '@/lib/utils'
import React from 'react'

function FoemattedDateTime({date,ClassName}:{date:string,ClassName?:string}) {
  return (
    <p className={cn("body-1 text-light-200",ClassName)}>
        {formatDateTime(date)}
    </p>
  )
}

export default FoemattedDateTime