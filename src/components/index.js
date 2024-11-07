import authenticate from './authenticate';
import QuoteGeneration from './QuoteGeneration/QuoteGeneration';
import QuotesList from './QuotesList/QuotesList';

export const ProtectedQuoteGeneration = authenticate(QuoteGeneration);
export const ProtectedQuotesList = authenticate(QuotesList);

