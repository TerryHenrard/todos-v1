import { reset, seed } from 'drizzle-seed';
import { todos } from './schema/todos';
import { db } from './db';

async function main() {
  console.log('🌱 Starting database seeding...');
  try {
    await reset(db, { todos });
    console.log('📋 Seeding todos...');
    await seed(db, { todos }).refine((funcs) => ({
      todos: {
        count: 5,
        columns: {
          deletedAt: funcs.valuesFromArray({
            values: [undefined],
          }),
          title: funcs.valuesFromArray({
            values: [
              'Complete project documentation',
              'Review pull requests',
              'Update dependencies',
              'Write unit tests',
              'Fix authentication bug',
              'Design new landing page',
              'Optimize database queries',
              'Setup CI/CD pipeline',
              'Create user onboarding flow',
              'Implement dark mode',
              'Add search functionality',
              'Integrate payment system',
              'Setup monitoring',
              'Create API documentation',
              'Refactor legacy code',
              'Setup email notifications',
              'Add data validation',
              'Improve error handling',
              'Create admin dashboard',
              'Optimize for mobile',
            ],
          }),
          description: funcs.valuesFromArray({
            values: [
              'Need to document all the new features and API changes for the upcoming release.',
              'Review and merge pending pull requests from team members.',
              'Update all dependencies to their latest stable versions.',
              'Write comprehensive unit tests for the new authentication module.',
              "Fix the issue where users can't sign in with social providers.",
              'Design a modern and responsive landing page for better conversion.',
              'Optimize slow database queries affecting user experience.',
              'Setup automated CI/CD pipeline for faster deployments.',
              'Create an intuitive onboarding experience for new users.',
              'Implement dark mode theme throughout the application.',
              'Add global search functionality across all data.',
              'Integrate Stripe payment system for subscription management.',
              'Setup comprehensive monitoring and alerting system.',
              'Create detailed API documentation for external developers.',
              'Refactor old codebase to improve maintainability.',
              'Setup automated email notifications for important events.',
              'Add proper data validation on both client and server side.',
              'Implement better error handling and user feedback.',
              'Create an admin dashboard for content management.',
              'Optimize the application for mobile devices and tablets.',
            ],
          }),
          status: funcs.valuesFromArray({
            values: [
              { weight: 0.4, values: ['to do'] },
              { weight: 0.4, values: ['to complete'] },
              { weight: 0.2, values: ['finished'] },
            ],
          }),
          userId: funcs.valuesFromArray({
            values: ['cWyca93egZcByWWBsSTvOJe2SVHsTv8X'],
          }),
          updatedAt: funcs.valuesFromArray({
            values: [undefined],
          }),
        },
      },
    }));

    console.log('✅ Database seeded successfully!');
    console.log('📊 Created:');
    console.log('  - 5 todos distributed across users');
    console.log('  - Distribution: more todos for user1, fewer for user5');
    console.log(
      '  - Status distribution: 40% to do, 40% to complete, 20% finished'
    );
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
