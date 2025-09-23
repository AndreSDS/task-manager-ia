import { faker } from '@faker-js/faker';
import prisma from './prisma';

async function main() {
  await prisma.user.deleteMany();
  await prisma.task.deleteMany();

  const users = Array.from({ length: 20 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
    is_active: 1,
    created_at: new Date(),
    updated_at: new Date(),
    last_login: faker.date.recent(),
  }));

  await prisma.user.createMany({ data: users });
  console.log('Seed: 20 usuários criados com sucesso!');

  const tasks = Array.from({ length: 20 }).map(() => {
    const title = faker.lorem.words({ min: 3, max: 6 });
    const description = faker.lorem.sentence();
    const stepsArr = Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => faker.lorem.sentence());
    const acceptanceArr = Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => faker.lorem.sentence());
    const testsArr = Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => `it('${faker.lorem.words({ min: 3, max: 7 })}')`);
    const implementation = faker.lorem.sentence();
    const estimated_time = `${faker.number.int({ min: 1, max: 5 })} dias`;
    const content = `# ${title}\n${description}\n\n## Steps\n${stepsArr.join('\n')}\n\n## Acceptance Criteria\n${acceptanceArr.join('\n')}\n\n## Suggested Tests\n${testsArr.join('\n')}\n\n## Implementation\n${implementation}`;
    const chat_history = [{ role: 'system', content: 'Tarefa gerada automaticamente.' }];
    return {
      title,
      description,
      steps: JSON.stringify(stepsArr),
      estimated_time,
      implementation_suggestion: implementation,
      acceptance_criteria: JSON.stringify(acceptanceArr),
      suggested_tests: JSON.stringify(testsArr),
      content,
      chat_history: JSON.stringify(chat_history),
      created_at: new Date(),
      updated_at: new Date(),
    };
  });

  await prisma.task.createMany({ data: tasks });
  console.log('Seed: 20 tarefas criadas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });