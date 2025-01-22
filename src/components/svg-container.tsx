import { type FC, useMemo } from 'react';
import { cn } from '~/lib/utils';

type SvgContainerProps = {
  height?: number;
  className?: string;
  name?: string;
  path: string;
  prefix?: string;
  width?: number;
};

const SvgContainer: FC<SvgContainerProps> = (props) => {
  const { className, height = 512, name, path, prefix, width = 512 } = props;

  const viewBox = useMemo(() => `0 0 ${width} ${height}`, [height, width]);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden={true}
      focusable={false}
      data-prefix={prefix}
      data-icon={name}
      name={name}
      role='img'
      viewBox={viewBox}
      className={cn('svg-inline--fa lucide lucide-react', className)}
    >
      <path fill='currentColor' d={path.toString()} />
    </svg>
  );
};

export default SvgContainer;
