
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'started':
      return 'text-green-600 font-medium';
    case 'completed':
      return 'text-blue-600 font-medium';
    case 'pending':
    default:
      return 'text-gray-600';
  }
};

export const getButtonVariant = (status: string) => {
  if (status === 'started') {
    return 'bg-green-600 hover:bg-green-700 text-white';
  }
  return 'bg-blue-600 hover:bg-blue-700 text-white';
};

export const getButtonText = (status: string) => {
  if (status === 'started') {
    return 'Continue Test';
  }
  return 'Start Hearing Test';
};
