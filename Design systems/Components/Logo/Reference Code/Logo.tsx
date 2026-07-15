import LogoIcon from "~/solidJs/shared/ui/atoms/Icons/Logo.svg?component-solid";
export const Logo = () => {
	return (
		<div class="flex size-[26px] items-center justify-center rounded-full bg-gradient-to-br from-[#7D7AF2] to-[#FC51FF] p-0">
			<LogoIcon class="h-full w-full" />
		</div>
	);
};
