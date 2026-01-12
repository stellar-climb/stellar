export enum QueueName {
  HEALTH = 'health-queue',
  HISTORY = 'history-queue',
}

export default Object.values(QueueName).map((name) => ({ name }));
