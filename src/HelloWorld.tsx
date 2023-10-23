import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
	OffthreadVideo,
	interpolateColors,
} from 'remotion';
import './hello_world.css';
import mov1 from '../public/assets/mov1.mp4';

export const HelloWorld: React.FC = () => {
	const frame = useCurrentFrame();

	const { fps, durationInFrames, width, height } = useVideoConfig();

	const bgColor = interpolateColors(
		frame,
		[42, 86, 128, 172, 214, 256, durationInFrames],
		[
			'#FF0000',
			'#FF7F00',
			'#FFFF00',
			'#7FFF00',
			'#0000FF',
			'#4B0082',
			'#9400D3',
		]
	);

	const opacityVideo = interpolate(frame, [0, durationInFrames], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const scaleVideo = interpolate(frame, [0, durationInFrames], [0, 2], {
		extrapolateRight: 'clamp',
	});

	const rotateAndIsTallText =
		interpolate(frame, [120, 180], [360, 0], {
			extrapolateRight: 'clamp',
		}) + 'deg';

	const translateXFrameText =
		interpolate(frame, [0, 60], [-500, 0], {
			extrapolateRight: 'clamp',
		}) + 'px';

	const scaleWidthText = spring({
		fps,
		frame,
	});

	const scaleTallText = spring({
		fps,
		frame,
		delay: 180,
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 60,
				background: bgColor,
			}}
		>
			<AbsoluteFill
				style={{
					top: '25%',
					left: '0%',
				}}
			>
				<OffthreadVideo
					style={{
						height: height / 2,
						opacity: opacityVideo,
						transform: `scale(${scaleVideo})`,
					}}
					className="square"
					src={mov1}
				/>
			</AbsoluteFill>
			<AbsoluteFill>
				<p
					style={{
						transform: `translateX(${translateXFrameText})`,
					}}
					className="frameText"
				>
					The current frame is {frame}.
				</p>
			</AbsoluteFill>
			<div>
				<Sequence
					style={{
						justifyContent: 'flex-end',
						alignItems: 'flex-start',
					}}
					durationInFrames={durationInFrames}
				>
					<p
						style={{
							transform: `scale(${scaleWidthText})`,
						}}
					>
						This video is {durationInFrames / fps} seconds long, and is {width}
						px wide,
					</p>
				</Sequence>
				<Sequence
					style={{
						justifyContent: 'flex-end',
						alignItems: 'flex-start',
						transform: `rotate(${rotateAndIsTallText}) scale(${scaleTallText})`,
						top: 60,
					}}
					from={durationInFrames / 2}
				>
					<p>
						and is {height}
						px tall.
					</p>
				</Sequence>
			</div>
		</AbsoluteFill>
	);
};
