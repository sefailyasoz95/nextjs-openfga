"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type DurationOption = {
	value: number; // duration in milliseconds
	label: string;
};

const durationOptions: DurationOption[] = [
	{ value: 5 * 60 * 1000, label: "5 minutes" },
	{ value: 10 * 60 * 1000, label: "10 minutes" },
	{ value: 15 * 60 * 1000, label: "15 minutes" },
	{ value: 30 * 60 * 1000, label: "30 minutes" },
];

export default function TemporaryAdminAccess() {
	const { userId } = useAuth();
	const [targetUser, setTargetUser] = useState("");
	const [selectedDuration, setSelectedDuration] = useState<number>(durationOptions[0].value);
	const [activeGrants, setActiveGrants] = useState<Array<{ user: string; expiresAt: number; timerId: NodeJS.Timeout }>>(
		[]
	);
	// For UI feedback
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

	// Clean up timers on unmount
	useEffect(() => {
		return () => {
			activeGrants.forEach((grant) => clearTimeout(grant.timerId));
		};
	}, [activeGrants]);

	// Format user ID by adding 'user:' prefix if needed
	const formatUserId = (email: string): string => {
		// If already has 'user:' prefix, return as is
		if (email.startsWith("user:")) return email;
		// Otherwise add the prefix
		return `user:${email}`;
	};

	// Extract email from user ID (remove 'user:' prefix)
	const extractEmail = (userId: string): string => {
		return userId.startsWith("user:") ? userId.substring(5) : userId;
	};

	const grantTemporaryAccess = async () => {
		if (!targetUser) {
			setMessage({ text: "Please enter an email address", type: "error" });
			return;
		}

		setIsSubmitting(true);
		setMessage(null);

		try {
			// Format user ID before sending to API
			const formattedUserId = formatUserId(targetUser);

			// Write tuple to OpenFGA granting temporary admin access
			const response = await fetch("/api/grant-temporary-access", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: formattedUserId,
					duration: selectedDuration,
					grantedBy: userId,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to grant temporary access");
			}

			const data = await response.json();

			// Set up timer to track expiration in UI
			const expiresAt = Date.now() + selectedDuration;
			const timerId = setTimeout(() => {
				// Remove from active grants when expired
				setActiveGrants((prev) => prev.filter((grant) => grant.user !== formattedUserId));
				setMessage({ text: `Temporary admin access for ${extractEmail(formattedUserId)} has expired`, type: "info" });
			}, selectedDuration);

			// Add to active grants
			setActiveGrants((prev) => [...prev, { user: formattedUserId, expiresAt, timerId }]);

			// Reset form and show success message
			setTargetUser("");
			setMessage({
				text: `Temporary admin access granted to ${extractEmail(formattedUserId)} for ${getFormattedDuration(
					selectedDuration
				)}`,
				type: "success",
			});
		} catch (error) {
			console.error("Error granting temporary access:", error);
			setMessage({ text: "Failed to grant temporary access", type: "error" });
		} finally {
			setIsSubmitting(false);
		}
	};

	const revokeAccess = async (user: string) => {
		try {
			const response = await fetch("/api/revoke-temporary-access", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user,
					revokedBy: userId,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to revoke access");
			}

			// Remove from active grants and clear the timer
			setActiveGrants((prev) => {
				const grant = prev.find((g) => g.user === user);
				if (grant) {
					clearTimeout(grant.timerId);
				}
				return prev.filter((g) => g.user !== user);
			});

			setMessage({ text: `Access revoked for ${extractEmail(user)}`, type: "success" });
		} catch (error) {
			console.error("Error revoking access:", error);
			setMessage({ text: "Failed to revoke access", type: "error" });
		}
	};

	const getFormattedDuration = (ms: number) => {
		return durationOptions.find((option) => option.value === ms)?.label || "";
	};

	const getTimeRemaining = (expiresAt: number) => {
		const remaining = Math.max(0, expiresAt - Date.now());
		const minutes = Math.floor(remaining / 60000);
		const seconds = Math.floor((remaining % 60000) / 1000);
		return `${minutes}m ${seconds}s`;
	};

	// Update remaining time display
	useEffect(() => {
		if (activeGrants.length === 0) return;

		const interval = setInterval(() => {
			// Force re-render to update time display
			setActiveGrants((prev) => [...prev]);
		}, 1000);

		return () => clearInterval(interval);
	}, [activeGrants.length]);

	return (
		<div className='p-6 rounded-xl shadow-lg bg-white max-w-xl mx-auto mt-10'>
			<h2 className='text-2xl font-bold mb-4'>Temporary Admin Access</h2>
			<div className='space-y-4'>
				<div>
					<label className='block text-sm mb-1'>Email Address</label>
					<input
						type='email'
						placeholder='e.g. bob@example.com'
						className='w-full p-2 rounded border'
						value={targetUser}
						onChange={(e) => setTargetUser(e.target.value)}
					/>
				</div>
				<div>
					<label className='block text-sm mb-1'>Duration</label>
					<select
						className='w-full p-2 rounded border'
						value={selectedDuration}
						onChange={(e) => setSelectedDuration(Number(e.target.value))}>
						{durationOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				<button
					className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full'
					onClick={grantTemporaryAccess}
					disabled={isSubmitting}>
					{isSubmitting ? "Granting Access..." : "Grant Temporary Admin Access"}
				</button>

				{message && (
					<div
						className={`p-3 rounded ${
							message.type === "success"
								? "bg-green-100 text-green-800"
								: message.type === "error"
								? "bg-red-100 text-red-800"
								: "bg-blue-100 text-blue-800"
						}`}>
						{message.text}
					</div>
				)}

				{activeGrants.length > 0 && (
					<div className='mt-6'>
						<h3 className='text-lg font-semibold mb-2'>Active Temporary Admins</h3>
						<div className='space-y-2'>
							{activeGrants.map((grant) => (
								<div key={grant.user} className='flex justify-between items-center p-3 bg-gray-50 rounded-md'>
									<div>
										<span className='font-medium'>{extractEmail(grant.user)}</span>
										<div className='text-sm text-gray-500'>Expires in: {getTimeRemaining(grant.expiresAt)}</div>
									</div>
									<button className='text-red-600 hover:text-red-800 text-sm' onClick={() => revokeAccess(grant.user)}>
										Revoke
									</button>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
