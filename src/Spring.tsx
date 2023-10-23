import { ReactElement } from 'react';
import {
	Sequence,
	SequenceProps,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const Spring = ({
	sequenceStep,
	children,
	sequenceConfig,
}: {
	sequenceStep: number;
	children: ReactElement;
	sequenceConfig?: SequenceProps;
}) => {
	const { fps, durationInFrames } = useVideoConfig();

	const frame = useCurrentFrame();

	const scale = spring({
		fps,
		frame: frame * sequenceStep - durationInFrames,
	});

	return (
		<Sequence
			style={{
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					transform: `scale(${scale})`,
				}}
			>
				{children}
			</div>
		</Sequence>
	);
};
