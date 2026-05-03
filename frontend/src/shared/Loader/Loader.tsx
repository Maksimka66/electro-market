import { CircularProgress } from 'react-loader-spinner'
import { ILoaderProps } from '@/src/interfaces/props'

export default function Loader({ width, height }: ILoaderProps) {
    return (
        <CircularProgress
            width={width}
            height={height}
            color='#4fa94d'
            ariaLabel='circular-progress-loading'
            visible={true}
            strokeWidth={2}
            animationDuration={1}
        />
    )
}

