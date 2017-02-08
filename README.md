# Binary Term Document Incidence Matrix
<p>Binary Term Document Incidence Matrix is a well known solution model for <a href="http://nlp.stanford.edu/IR-book/html/htmledition/an-example-information-retrieval-problem-1.html">Information Retrival Problem</a>. <br>
The Boolean retrieval model is a model for information retrieval in which we can pose any query which is in the form of a Boolean expression of terms, that is, in which terms are combined with the operators and ( &amp; ) , or ( | ) , and not( ! ). The model views each document as just a set of words. </p>
see live demo <a href="jimishf.github.io/Binary-Term-Document-Incidence-Matrix/index.html">here</a> 
   
   <h3>Steps to follow</h3>
	<ol>
		<li>	Select numeber of documents ( between 2-9 )</li>
		<li>	Give Names to those docs. and provide appropriate content of it.</li>
		<li> 	Type your Query and Hit apply.</li>
	</ol>
	
<h3> Rules for query </h3>
* You can use opeartors & for Logical AND, | for logical OR, ! for Logical NOT		
* You need to put tokens in between tags ( Example. &lt;token&gt; )
* You can use only Round Brackets <b>(</b>  <b>)</b> for evaluation priority of the sub expression.
<h3> Query Exmaple </h3>

		// query in layman terms.
		Brutus AND Caesar AND NOT Calpurnia
		
		//query for this application
		<Brutus> & <Caesar> & !<Calpurnia>
				or
		(<Brutus> & <Caesar>) & (!<Calpurnia>)
		
