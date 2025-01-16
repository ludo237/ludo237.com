"use client";

import type { User } from "@supabase/supabase-js";
import { PartyPopper } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { addGame } from "~/actions/sudoku";
import { SudokuBoard } from "~/components/sudoku/board";
import { DifficultySelector } from "~/components/sudoku/difficulty-selector";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { checkCompletion, generateSudoku, isValid } from "~/lib/sudoku";
import { formatTime } from "~/lib/utils";

const Game: FC<{ user: User | null }> = ({ user }) => {
	const [difficulty, setDifficulty] = useState<string>("easy");
	const [board, setBoard] = useState<SudokuBoard>([]);
	const [initialBoard, setInitialBoard] = useState<SudokuBoard>([]);
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
	const [isComplete, setIsComplete] = useState(false);
	const [time, setTime] = useState(0);
	const [moves, setMoves] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			if (!isComplete) {
				setTime((t) => t + 1);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [isComplete]);

	useEffect(() => {
		const handleSudokuCompletition = async () => {
			if (user) {
				await addGame(user, moves, time, difficulty);
			}
		};

		if (isComplete) {
			handleSudokuCompletition();
		}
	}, [isComplete]);

	// Generate the board when the component mounts or difficulty changes
	useEffect(() => {
		handleRestart();
	}, [difficulty, user]);

	const handleCellChange = (row: number, col: number, value: number) => {
		if (initialBoard[row][col] !== 0) return;
		setMoves((m) => m + 1);

		const newBoard = board.map((row) => [...row]);
		const newErrors = { ...errors };

		if (value === 0 || isValid(newBoard, row, col, value)) {
			newBoard[row][col] = value;
			delete newErrors[`${row}-${col}`];

			// Check if game is complete after valid move
			if (checkCompletion(newBoard, errors)) {
				setIsComplete(true);
			}
		} else {
			newErrors[`${row}-${col}`] = true;
		}

		setBoard(newBoard);
		setErrors(newErrors);
	};

	const handleRestart = () => {
		setTime(0);
		setMoves(0);
		setIsComplete(false);
		setErrors({});

		const newBoard = generateSudoku(difficulty);
		setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
		setBoard(newBoard);
	};

	return (
		<div className="flex flex-col items-center justify-center space-y-6">
			<div className="flex space-x-3 text-sm">
				<p>Time: {formatTime(time)}</p>
				<Separator orientation="vertical" />
				<p>Moves: {moves}</p>
			</div>

			{isComplete && (
				<Alert>
					<PartyPopper className="size-5" />
					<AlertTitle>Congratulations!</AlertTitle>
					<AlertDescription>
						<p>
							You finished the board in {formatTime(time)} minutes with {moves}{" "}
							moves!
						</p>
						<div className="flex w-full items-center justify-end">
							<Button size="xs" onClick={handleRestart}>
								Play again
							</Button>
						</div>
					</AlertDescription>
				</Alert>
			)}
			{!isComplete && (
				<>
					<DifficultySelector
						difficulty={difficulty}
						onDifficultyChange={setDifficulty}
					/>
					<SudokuBoard
						board={board}
						initialBoard={initialBoard}
						errors={errors}
						onCellChange={handleCellChange}
					/>
				</>
			)}
		</div>
	);
};

export { Game };
