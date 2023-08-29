import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import { afterEach, describe, it, vi, expect } from 'vitest';
import Button from '~/components/base/button/Button.svelte';
import ButtonTestFixture from './ButtonTestFixture.svelte';
import { tick } from 'svelte';

describe('Button', () => {
	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});
	beforeEach(() => {
		vi.useFakeTimers();
	});

	it('renders', () => {
		render(ButtonTestFixture);
		expect(screen.getByRole('button')).toHaveTextContent('Hello world');
	});
	it('forwards events', async () => {
		const onClick = vi.fn();
		const onFocus = vi.fn();
		const onBlur = vi.fn();
		const onKeyUp = vi.fn();
		const onKeyDown = vi.fn();

		const { component } = render(Button);

		component.$on('click', onClick);
		component.$on('focus', onFocus);
		component.$on('blur', onBlur);
		component.$on('keyup', onKeyUp);
		component.$on('keydown', onKeyDown);

		// Test for each event
		await fireEvent.click(screen.getByRole('button'));
		await fireEvent.focus(screen.getByRole('button'));
		await fireEvent.blur(screen.getByRole('button'));
		await fireEvent.keyUp(screen.getByRole('button'));
		await fireEvent.keyDown(screen.getByRole('button'));

		expect(onClick).toHaveBeenCalled();
		expect(onFocus).toHaveBeenCalled();
		expect(onBlur).toHaveBeenCalled();
		expect(onKeyUp).toHaveBeenCalled();
		expect(onKeyDown).toHaveBeenCalled();
	});

	describe('networkStatus', () => {
		it('defaults to INITIAL', () => {
			render(ButtonTestFixture);
			expect(screen.getByRole('button')).toHaveTextContent('Hello world, INITIAL');
		});
		it.each(['INITIAL', 'PENDING', 'SUCCESS', 'ERROR'])(
			'exposes prop to slot networkStatus=%s',
			(networkStatus) => {
				render(ButtonTestFixture, { networkStatus });
				expect(screen.getByRole('button')).toHaveTextContent('Hello world, ' + networkStatus);
			}
		);
		it('reset to INITIAL after duration', async () => {
			render(ButtonTestFixture, {
				networkStatus: 'SUCCESS',
				revertDuration: 1000
			});
			vi.advanceTimersByTime(5001);
			await tick();
			expect(screen.getByRole('button')).toHaveTextContent('Hello world, INITIAL');
		});
		it('disables button when networkStatus is PENDING', async () => {
			render(ButtonTestFixture, {
				networkStatus: 'PENDING'
			});
			expect(screen.getByRole('button')).toBeDisabled();
		});
	});
});
