import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'A public todo app | Home',
	description: 'Home page of the public todo app',
};

export default function Home() {
	return (
		<section>
			<h1>Public Todos</h1>
			<p>
				A simple todo list built with Next.js using Page routing approach.
				<br />
				Start listing your todo <Link href="/todos">here</Link>.
			</p>
			<p>
				See example of server side page rendering{' '}
				<Link href="/hello">here</Link>.
			</p>
		</section>
	);
}
