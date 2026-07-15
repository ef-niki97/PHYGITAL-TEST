import { Slider, type SliderRootProps } from "@ark-ui/solid";
import { splitProps } from "solid-js";
import { twJoin, twMerge } from "tailwind-merge";
export type StyledSliderProps = {
	trackClass?: string;
	controllClass?: string;
} & SliderRootProps;
export const StyledSlider = (props: StyledSliderProps) => {
	const [customProps, nativeProps] = splitProps(props, ["class", "trackClass", "controllClass"]);
	return (
		<Slider.Root
			class={twMerge("w-full touch-none select-none", customProps.class)}
			{...nativeProps}
		>
			<Slider.Control class={props.controllClass}>
				<Slider.Track
					class={twMerge(
						"h-4 w-full overflow-hidden rounded-full bg-gray-700",
						props.trackClass
					)}
				>
					<Slider.Range
						class={twJoin(
							"bg-size-200 from-violet-500 via-fuchsia-400 to-violet-500",
							props.orientation === "vertical"
								? "w-full bg-gradient-to-t"
								: "h-full bg-gradient-to-r"
						)}
					/>
					<Slider.Thumb
						class="size-4 cursor-pointer rounded-full bg-white outline-1 transition-colors focus:outline focus:outline-blue-500 disabled:pointer-events-none disabled:opacity-50"
						index={0}
					/>
				</Slider.Track>
			</Slider.Control>
		</Slider.Root>
	);
};
