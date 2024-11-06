import withAuth from './withAuth';
import QuoteGeneration from './QuoteGeneration/QuoteGeneration';
import QuotesList from './QuotesList/QuotesList';

export const ProtectedQuoteGeneration = withAuth(QuoteGeneration);
export const ProtectedQuotesList = withAuth(QuotesList);

