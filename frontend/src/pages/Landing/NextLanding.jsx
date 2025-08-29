import React from 'react';
import { Link } from 'react-router-dom';

import imgCharacters from '../../../landing_page/landing_page/public/landing_page_centre_img.png';
// Fallback to existing avatar asset; replace with your file path when available
import imgAvatar from '../../../landing_page/landing_page/public/mahapatra.png';

function Pill(props) {
	const { bg, text } = props;
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600 }}>
			<div style={{ width: 32, height: 24, background: bg, color: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{text.split(' ')[0]}</div>
			<span>{text}</span>
		</div>
	);
}

export default function NextLanding() {
	return (
		<div style={{ minHeight: '100vh', background: '#fff', color: '#1f2937', display: 'flex', flexDirection: 'column' }}>
			<header style={{ borderBottom: '1px solid #e5e7eb', background: 'rgba(255,255,255,0.95)', position: 'sticky', top: 0, zIndex: 1 }}>
				<div style={{ maxWidth: 1140, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<div style={{ width: 32, height: 32, background: '#059669', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>C</div>
						<span style={{ fontSize: 20, fontWeight: 700 }}>CodeDuo</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280' }}>
						<span>SITE LANGUAGE: ENGLISH</span>
						
					</div>
				</div>
			</header>

			<section style={{ padding: '64px 16px' }}>
				<div style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gap: 32, alignItems: 'center', gridTemplateColumns: '1fr' }}>
					<div className="hero-text" style={{ display: 'grid', gap: 24 }}>
						<div style={{ display: 'grid', gap: 12 }}>
							<h1 style={{ fontSize: 40, lineHeight: 1.1, fontWeight: 800 }}>
								The free, fun, and effective way to learn <span style={{ color: '#059669' }}>programming!</span>
							</h1>
							<p style={{ fontSize: 18, color: '#6b7280' }}>
								Master coding through interactive lessons, gamified challenges, and a supportive community. Start your programming journey today!
							</p>
						</div>
						<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
							<Link to="/register" style={{ padding: '14px 22px', background: '#059669', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>GET STARTED</Link>
							<Link to="/login" style={{ padding: '12px 20px', color: '#10b981', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>I ALREADY HAVE AN ACCOUNT</Link>
						</div>
					</div>
					<div className="hero-visual" style={{ position: 'relative' }}>
						<div style={{ position: 'relative', background: 'linear-gradient(135deg, #05966920, #0ea5e920)', borderRadius: 24, padding: 24 }}>
							<img src={imgCharacters} alt="Coding characters learning together" style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block', margin: '0 auto' }} />
							<div style={{ position: 'absolute', top: -12, right: -12, background: '#22c55e', color: '#fff', borderRadius: 9999, padding: 10 }}>⚡</div>
							<div style={{ position: 'absolute', bottom: -12, left: -12, background: '#a78bfa', color: '#fff', borderRadius: 9999, padding: 10 }}>🏆</div>
						</div>
					</div>
				</div>
			</section>

			<section style={{ padding: '24px 16px', borderTop: '1px solid #e5e7eb' }}>
				<div style={{ maxWidth: 1140, margin: '0 auto' }}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
						<Pill bg="#3b82f6" text="JS" />
						<Pill bg="#2563eb" text="P" />
						<Pill bg="#f97316" text="JAVA" />
						<Pill bg="#1d4ed8" text="C++" />
						
					</div>
				</div>
			</section>

			<section style={{ padding: '64px 16px', background: '#f8fafc' }}>
				<div style={{ maxWidth: 1140, margin: '0 auto' }}>
					<div style={{ textAlign: 'center', marginBottom: 24 }}>
						<h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Why millions choose CodeDuo</h2>
						<p style={{ fontSize: 18, color: '#6b7280' }}>Our proven approach makes learning to code engaging, effective, and fun for everyone.</p>
					</div>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 16 }}>
						{[
							['▶','Interactive Lessons','Learn by doing with hands-on coding exercises and real-time feedback on every line of code.'],
							['🏆','Gamified Learning','Earn points, unlock achievements, and compete with friends as you progress through coding challenges.'],
							['👥','Community Support','Join a vibrant community of learners and get help from peers and mentors whenever you need it.'],
						].map(([icon,title,desc]) => (
							<div key={title} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 12, padding: 24 }}>
								<div style={{ width: 48, height: 48, background: '#05966920', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 20 }}>{icon}</div>
								<h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{title}</h3>
								<p style={{ color: '#6b7280' }}>{desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section style={{ padding: '48px 16px' }}>
				<div style={{ maxWidth: 1140, margin: '0 auto' }}>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 16, textAlign: 'center' }}>
						{[
							['500M+','Learners worldwide','#059669'],
							['40+','Programming languages','#10b981'],
							['15min','Daily lessons','#0ea5e9'],
						].map(([value,label,color]) => (
							<div key={label}>
								<div style={{ fontSize: 36, fontWeight: 800, color, marginBottom: 6 }}>{value}</div>
								<div style={{ color: '#6b7280' }}>{label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section style={{ padding: '64px 16px', background: '#f8fafc' }}>
				<div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
					

					{/* Additional comments */}
					<div style={{ display: 'grid', gap: 16, maxWidth: 680, margin: '0 auto' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
							{/* placeholder link spot for future image upload */}
							<a href="#" style={{ width: 40, height: 40, borderRadius: 9999, border: '1px dashed #d1d5db', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#6b7280', textDecoration: 'none' }}>img 1</a>
							<div style={{ textAlign: 'left', maxWidth: 560 }}>
								<div style={{ fontWeight: 700 }}>Abhay Tripathi</div>
								<div style={{ color: '#6b7280' }}>motu don</div>
								<div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
									{['s1','s2','s3','s4','s5'].map((key) => (<span key={`a-${key}`} style={{ color: '#fbbf24', fontSize: 18 }}>★</span>))}
								</div>
								<blockquote style={{ marginTop: 8, fontSize: 16, fontWeight: 600, color: '#111827' }}>
									"CodeDuo taught me timing now I deliver punchlines like optimized code. Daily streaks turned into daily scripts for my career!"
								</blockquote>
							</div>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
							{/* placeholder link spot for future image upload */}
							<a href="#" style={{ width: 40, height: 40, borderRadius: 9999, border: '1px dashed #d1d5db', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#6b7280', textDecoration: 'none' }}>img 2</a>
							<div style={{ textAlign: 'left', maxWidth: 560 }}>
								<div style={{ fontWeight: 700 }}>anshul atre</div>
								<div style={{ color: '#6b7280' }}>tamil actor</div>
								<div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
									{['s1','s2','s3','s4','s5'].map((key) => (<span key={`n-${key}`} style={{ color: '#fbbf24', fontSize: 18 }}>★</span>))}
								</div>
								<blockquote style={{ marginTop: 8, fontSize: 16, fontWeight: 600, color: '#111827' }}>
									"Blocking scenes felt like arranging functions—now my cues hit like clean commits. CodeDuo refactored my rehearsal routine and boosted my roles."
								</blockquote>
							</div>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
							{/* placeholder link spot for future image upload */}
							<a href="#" style={{ width: 40, height: 40, borderRadius: 9999, border: '1px dashed #d1d5db', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#6b7280', textDecoration: 'none' }}>img 2</a>
							<div style={{ textAlign: 'left', maxWidth: 560 }}>
								<div style={{ fontWeight: 700 }}>Maha Patra </div>
								<div style={{ color: '#6b7280' }}>hero from Odisha</div>
								<div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
									{['s1','s2','s3','s4','s5'].map((key) => (<span key={`n-${key}`} style={{ color: '#fbbf24', fontSize: 18 }}>★</span>))}
								</div>
								<blockquote style={{ marginTop: 8, fontSize: 16, fontWeight: 600, color: '#111827' }}>
									"CodeDuo made learning Coding so much fun! The interactive lessons and gamification kept me motivated throughout my coding journey."
								</blockquote>
							</div>
						</div>
					</div>
				</div>
				
			</section>

			<section style={{ padding: '64px 16px' }}>
				<div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
					<h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Ready to start your coding adventure?</h2>
					<p style={{ fontSize: 18, color: '#6b7280', marginBottom: 16 }}>
						Join millions of learners and start building your programming skills today. It's free to get started!
					</p>
					<Link to="/register" style={{ padding: '14px 22px', background: '#059669', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>Start Learning Now</Link>
				</div>
			</section>

			<footer style={{ borderTop: '1px solid #e5e7eb', background: '#f8fafc', padding: '32px 16px' }}>
				<div style={{ maxWidth: 1140, margin: '0 auto' }}>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 16 }}>
						<div>
							<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
								<div style={{ width: 32, height: 32, background: '#059669', borderRadius: 8 }} />
								<span style={{ fontSize: 18, fontWeight: 700 }}>CodeDuo</span>
							</div>
							<p style={{ color: '#6b7280', fontSize: 14 }}>
								Making coding education accessible, fun, and effective for everyone.
							</p>
						</div>
						<div>
							<h4 style={{ fontWeight: 700, marginBottom: 8 }}>Courses</h4>
							<ul style={{ display: 'grid', gap: 6, color: '#6b7280', fontSize: 14 }}>
								<li>JavaScript</li>
								<li>Python</li>
								<li>Java</li>
								<li>C++</li>
							</ul>
						</div>
						<div>
							<h4 style={{ fontWeight: 700, marginBottom: 8 }}>Company</h4>
							<ul style={{ display: 'grid', gap: 6, color: '#6b7280', fontSize: 14 }}>
								<li>About</li>
								<li>Careers</li>
								<li>Press</li>
								<li>Contact</li>
							</ul>
						</div>
						<div>
							<h4 style={{ fontWeight: 700, marginBottom: 8 }}>Support</h4>
							<ul style={{ display: 'grid', gap: 6, color: '#6b7280', fontSize: 14 }}>
								<li>Help Center</li>
								<li>Community</li>
								<li>Privacy</li>
								<li>Terms</li>
							</ul>
						</div>
					</div>
					<div style={{ borderTop: '1px solid #e5e7eb', marginTop: 16, paddingTop: 16, textAlign: 'center', fontSize: 14, color: '#6b7280' }}>
						© 2025 CodeDuo. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	);
}
