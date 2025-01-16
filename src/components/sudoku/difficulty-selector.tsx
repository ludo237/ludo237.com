import type React from "react";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

interface DifficultySelectorProps {
	difficulty: string;
	onDifficultyChange: (newDifficulty: string) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
	difficulty,
	onDifficultyChange,
}) => {
	return (
		<RadioGroup
			className="flex items-center space-x-3"
			defaultValue={difficulty}
			onValueChange={(value) => onDifficultyChange(value)}
		>
			<div className="flex items-center space-x-1.5">
				<RadioGroupItem value="easy" id="easy" />
				<Label htmlFor="easy" className="dark:text-slate-400">
					Easy
				</Label>
			</div>
			<div className="flex items-center space-x-1.5">
				<RadioGroupItem value="medium" id="medium" />
				<Label htmlFor="medium" className="dark:text-slate-400">
					Medium
				</Label>
			</div>
			<div className="flex items-center space-x-1.5">
				<RadioGroupItem value="hard" id="hard" />
				<Label htmlFor="hard" className="dark:text-slate-400">
					Hard
				</Label>
			</div>
		</RadioGroup>
	);
};

export { DifficultySelector };
